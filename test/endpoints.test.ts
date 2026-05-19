import { expect } from 'chai';
import axios, { AxiosResponse } from 'axios';
import MailcowClient from '../src';

type Captured = {
  url?: string;
  payload?: unknown;
};

function fakeResponse<T>(data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };
}

function withMockedAxios(
  captured: Captured,
  resolveWith: unknown,
): () => void {
  const originalPost = axios.post;
  const originalGet = axios.get;
  (axios.post as unknown) = async (url: string, payload: unknown) => {
    captured.url = url;
    captured.payload = payload;
    return fakeResponse(resolveWith);
  };
  (axios.get as unknown) = async (url: string) => {
    captured.url = url;
    return fakeResponse(resolveWith);
  };
  return () => {
    (axios.post as unknown) = originalPost;
    (axios.get as unknown) = originalGet;
  };
}

describe('Endpoints (smoke against mocked axios)', () => {
  const mcc = new MailcowClient('https://example.test/api/v1/', 'k');

  it('normalises a base URL without a trailing slash', () => {
    const withSlash = new MailcowClient('https://example.test/api/v1/', 'k');
    const noSlash = new MailcowClient('https://example.test/api/v1', 'k');
    expect(withSlash.BASE_URL).to.equal('https://example.test/api/v1/');
    expect(noSlash.BASE_URL).to.equal('https://example.test/api/v1/');
  });

  it('mailbox.get("all") hits get/mailbox/all and wraps a single object into an array', async () => {
    const captured: Captured = {};
    const restore = withMockedAxios(captured, { username: 'one@example.test' });
    try {
      const res = await mcc.mailbox.get('all');
      expect(captured.url).to.equal('https://example.test/api/v1/get/mailbox/all');
      expect(res).to.have.length(1);
      expect(res[0]).to.deep.include({ username: 'one@example.test' });
    } finally {
      restore();
    }
  });

  it('mailbox.editQuarantine uses the EDIT_QUARANTINE route constant', async () => {
    const captured: Captured = {};
    const restore = withMockedAxios(captured, [{ type: 'success', msg: 'ok' }]);
    try {
      await mcc.mailbox.editQuarantine({
        attr: { quarantine_notification: 'never' },
        items: { anyOf: 'one@example.test' },
      });
      expect(captured.url).to.equal('https://example.test/api/v1/edit/quarantine_notification');
    } finally {
      restore();
    }
  });

  it('domains.create posts to add/domain with the given payload', async () => {
    const captured: Captured = {};
    const restore = withMockedAxios(captured, [{ type: 'success', msg: 'created' }]);
    try {
      await mcc.domains.create({
        domain: 'example.test',
        active: true,
        aliases: 10,
        backupmx: 0,
        defquota: 1024,
        description: '',
        lang: 'en',
        mailboxes: 10,
        maxquota: 1024,
        quota: 1024,
        relay_all_recipients: false,
        rl_frame: 'h',
        rl_value: 10,
        restart_sogo: false,
      });
      expect(captured.url).to.equal('https://example.test/api/v1/add/domain');
      expect(captured.payload).to.deep.include({ domain: 'example.test' });
    } finally {
      restore();
    }
  });
});
