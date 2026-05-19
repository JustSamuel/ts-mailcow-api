import { expect } from 'chai';
import axios, { AxiosError, AxiosResponse } from 'axios';
import MailcowClient, { MailcowException } from '../src';
import { wrapPromiseToArray } from '../src/request-factory';

type AxiosStub = {
  post?: (url: string, payload: unknown, config: unknown) => Promise<AxiosResponse>;
  get?: (url: string, config: unknown) => Promise<AxiosResponse>;
};

function mockAxios(stub: AxiosStub) {
  const originalPost = axios.post;
  const originalGet = axios.get;
  if (stub.post) (axios.post as unknown) = stub.post;
  if (stub.get) (axios.get as unknown) = stub.get;
  return () => {
    (axios.post as unknown) = originalPost;
    (axios.get as unknown) = originalGet;
  };
}

function fakeResponse<T>(data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {} as any,
  };
}

function fakeAxiosError(data: unknown, status = 500): AxiosError {
  const err = new Error('Request failed') as AxiosError;
  err.isAxiosError = true;
  err.response = fakeResponse(data, status);
  err.config = {} as any;
  err.toJSON = () => ({});
  err.name = 'AxiosError';
  return err;
}

describe('RequestFactory', () => {
  const mcc = new MailcowClient('https://example.test/api/v1', 'test-key');

  describe('post', () => {
    it('returns response body on a plain 2XX', async () => {
      const restore = mockAxios({
        post: async () => fakeResponse({ ok: true }),
      });
      try {
        const res = await mcc.requestFactory.post<{ ok: boolean }, object>('add/thing', {});
        expect(res).to.deep.equal({ ok: true });
      } finally {
        restore();
      }
    });

    it('throws MailcowException when 2XX body has type=danger', async () => {
      const restore = mockAxios({
        post: async () => fakeResponse([{ type: 'danger', msg: 'no such mailbox' }]),
      });
      try {
        await mcc.requestFactory.post('add/mailbox', {});
        expect.fail('expected MailcowException');
      } catch (e) {
        expect(e).to.be.instanceOf(MailcowException);
        expect((e as MailcowException).message).to.equal('no such mailbox');
      } finally {
        restore();
      }
    });

    it('throws MailcowException when 2XX body has type=error', async () => {
      const restore = mockAxios({
        post: async () => fakeResponse([{ type: 'error', msg: ['boom', 'kaboom'] }]),
      });
      try {
        await mcc.requestFactory.post('add/mailbox', {});
        expect.fail('expected MailcowException');
      } catch (e) {
        expect(e).to.be.instanceOf(MailcowException);
        expect((e as MailcowException).message).to.equal('boom, kaboom');
      } finally {
        restore();
      }
    });

    it('unwraps an axios error whose response body is a Mailcow error', async () => {
      const restore = mockAxios({
        post: async () => {
          throw fakeAxiosError([{ type: 'danger', msg: 'invalid api key' }]);
        },
      });
      try {
        await mcc.requestFactory.post('add/mailbox', {});
        expect.fail('expected MailcowException');
      } catch (e) {
        expect(e).to.be.instanceOf(MailcowException);
        expect((e as MailcowException).message).to.equal('invalid api key');
      } finally {
        restore();
      }
    });

    it('falls back to a generic MailcowException when axios error has no Mailcow shape', async () => {
      const restore = mockAxios({
        post: async () => {
          throw fakeAxiosError({ unrelated: 'payload' });
        },
      });
      try {
        await mcc.requestFactory.post('add/mailbox', {});
        expect.fail('expected MailcowException');
      } catch (e) {
        expect(e).to.be.instanceOf(MailcowException);
        expect((e as MailcowException).message).to.equal('Unknown Mailcow error');
      } finally {
        restore();
      }
    });

    it('rethrows non-axios errors untouched', async () => {
      const restore = mockAxios({
        post: async () => {
          throw new TypeError('network down');
        },
      });
      try {
        await mcc.requestFactory.post('add/mailbox', {});
        expect.fail('expected TypeError');
      } catch (e) {
        expect(e).to.be.instanceOf(TypeError);
        expect((e as Error).message).to.equal('network down');
      } finally {
        restore();
      }
    });

    it('sends payload and headers to the right URL', async () => {
      let capturedUrl = '';
      let capturedPayload: unknown = null;
      let capturedConfig: any = null;
      const restore = mockAxios({
        post: async (url, payload, config) => {
          capturedUrl = url;
          capturedPayload = payload;
          capturedConfig = config;
          return fakeResponse({ ok: true });
        },
      });
      try {
        await mcc.requestFactory.post('add/mailbox', { username: 'foo' });
        expect(capturedUrl).to.equal('https://example.test/api/v1/add/mailbox');
        expect(capturedPayload).to.deep.equal({ username: 'foo' });
        expect(capturedConfig.headers['X-API-Key']).to.equal('test-key');
      } finally {
        restore();
      }
    });
  });

  describe('get', () => {
    it('returns response body on a plain 2XX', async () => {
      const restore = mockAxios({
        get: async () => fakeResponse([{ id: 1 }, { id: 2 }]),
      });
      try {
        const res = await mcc.requestFactory.get<Array<{ id: number }>>('get/mailbox/all');
        expect(res).to.deep.equal([{ id: 1 }, { id: 2 }]);
      } finally {
        restore();
      }
    });

    it('throws MailcowException when GET body has type=danger', async () => {
      const restore = mockAxios({
        get: async () => fakeResponse({ type: 'danger', msg: 'forbidden' }),
      });
      try {
        await mcc.requestFactory.get('get/mailbox/all');
        expect.fail('expected MailcowException');
      } catch (e) {
        expect(e).to.be.instanceOf(MailcowException);
        expect((e as MailcowException).message).to.equal('forbidden');
      } finally {
        restore();
      }
    });
  });
});

describe('wrapPromiseToArray', () => {
  it('passes arrays through unchanged', async () => {
    const res = await wrapPromiseToArray(Promise.resolve([1, 2, 3]));
    expect(res).to.deep.equal([1, 2, 3]);
  });

  it('wraps a single value into an array', async () => {
    const res = await wrapPromiseToArray<number>(Promise.resolve(42));
    expect(res).to.deep.equal([42]);
  });

  it('propagates rejection as an Error', async () => {
    try {
      await wrapPromiseToArray(Promise.reject('nope'));
      expect.fail('expected rejection');
    } catch (e) {
      expect(e).to.be.instanceOf(Error);
      expect((e as Error).message).to.equal('nope');
    }
  });
});
