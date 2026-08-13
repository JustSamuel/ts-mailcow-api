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

  it('mailbox.create posts to add/mailbox with force_tfa included', async () => {
    const captured: Captured = {};
    const restore = withMockedAxios(captured, [{ type: 'success', msg: 'mailbox_added' }]);
    try {
      await mcc.mailbox.create({
        domain: 'example.test',
        local_part: 'info',
        name: 'Full name',
        active: 1,
        force_pw_update: false,
        force_tfa: true,
        password: 'x',
        password2: 'x',
        quota: 1024,
        authsource: 'mailcow',
        tls_enforce_in: false,
        tls_enforce_out: false,
      });
      expect(captured.url).to.equal('https://example.test/api/v1/add/mailbox');
      expect(captured.payload).to.deep.include({ force_tfa: true });
    } finally {
      restore();
    }
  });

  it('mailbox.edit posts to edit/mailbox with force_tfa and sender_acl in attr', async () => {
    const captured: Captured = {};
    const restore = withMockedAxios(captured, [{ type: 'success', msg: 'mailbox_modified' }]);
    try {
      await mcc.mailbox.edit({
        items: ['info@example.test'],
        attr: { force_tfa: true, sender_acl: ['@example.test'] },
      });
      expect(captured.url).to.equal('https://example.test/api/v1/edit/mailbox');
      expect(captured.payload).to.deep.equal({
        items: ['info@example.test'],
        attr: { force_tfa: true, sender_acl: ['@example.test'] },
      });
    } finally {
      restore();
    }
  });

  it('mailbox.get("one") surfaces force_tfa (nested under attributes) and sender_acl (top-level)', async () => {
    const captured: Captured = {};
    const mailboxResponse = {
      username: 'one@example.test',
      active: true,
      active_int: 1,
      domain: 'example.test',
      name: 'One',
      local_part: 'one',
      quota: 1024,
      messages: 0,
      attributes: {
        force_pw_update: false,
        force_tfa: true,
        tls_enforce_in: false,
        tls_enforce_out: false,
        sogo_access: true,
        imap_access: true,
        pop3_access: true,
        smtp_access: true,
        xmpp_access: false,
        xmpp_admin: false,
        mailbox_format: 'maildir:',
        quarantine_notification: 'never' as const,
        quarantine_category: 'reject' as const,
      },
      quota_used: 0,
      percent_in_use: 0,
      last_imap_login: 0,
      last_smtp_login: 0,
      last_pop3_login: 0,
      percent_class: 'success' as const,
      max_new_quota: 0,
      spam_aliases: 0,
      pushover_active: false,
      rl: { value: 0, frame: 'h' as const },
      rl_scope: 'domain',
      is_relayed: false,
      sender_acl: ['one@example.test'],
    };
    const restore = withMockedAxios(captured, mailboxResponse);
    try {
      const res = await mcc.mailbox.get('one@example.test');
      expect(res[0].attributes.force_tfa).to.equal(true);
      expect(res[0].sender_acl).to.deep.equal(['one@example.test']);
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

  describe('quarantine.edit', () => {
    it('posts to edit/qitem with the items + action payload', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['item_released', '33'] }]);
      try {
        await mcc.quarantine.edit({ items: [33, 34], attr: { action: 'release' } });
        expect(captured.url).to.equal('https://example.test/api/v1/edit/qitem');
        expect(captured.payload).to.deep.equal({ items: [33, 34], attr: { action: 'release' } });
      } finally {
        restore();
      }
    });

    it('accepts learnham as an action', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['item_learned', '34'] }]);
      try {
        await mcc.quarantine.edit({ items: [34], attr: { action: 'learnham' } });
        expect((captured.payload as any).attr.action).to.equal('learnham');
      } finally {
        restore();
      }
    });
  });

  describe('identityProvider.edit', () => {
    it('posts to edit/identity-provider with the items envelope', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: 'object_modified' }]);
      try {
        await mcc.identityProvider.edit({
          authsource: 'keycloak',
          server_url: 'https://auth.example.test',
          realm: 'mailcow',
          client_id: 'mailcow_client',
          client_secret: 'shh',
          redirect_url: 'https://mail.example.test',
          version: '26.1.3',
        });
        expect(captured.url).to.equal('https://example.test/api/v1/edit/identity-provider');
        expect(captured.payload).to.deep.include({ items: ['identity-provider'] });
        expect((captured.payload as any).attr).to.deep.include({
          authsource: 'keycloak',
          realm: 'mailcow',
        });
      } finally {
        restore();
      }
    });

    it('forwards LDAP attributes verbatim', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: 'object_modified' }]);
      try {
        await mcc.identityProvider.edit({
          authsource: 'ldap',
          host: '127.0.0.1',
          port: '389',
          basedn: 'DC=mailcow,DC=local',
          attribute_field: 'othermailbox',
          binddn: 'CN=LDAP,DC=mailcow,DC=local',
          bindpass: 'pw',
          filter: '(memberOf=DC=mailcow,DC=local)',
        });
        expect((captured.payload as any).attr.host).to.equal('127.0.0.1');
        expect((captured.payload as any).attr.filter).to.equal('(memberOf=DC=mailcow,DC=local)');
      } finally {
        restore();
      }
    });

    it('forwards generic-oidc attributes verbatim', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: 'object_modified' }]);
      try {
        await mcc.identityProvider.edit({
          authsource: 'generic-oidc',
          authorize_url: 'https://auth.example.test/authorize',
          token_url: 'https://auth.example.test/token',
          userinfo_url: 'https://auth.example.test/userinfo',
          client_id: 'mailcow_client',
          client_secret: 'shh',
          redirect_url: 'https://mail.example.test',
          client_scopes: 'openid profile email',
        });
        expect((captured.payload as any).attr.authsource).to.equal('generic-oidc');
        expect((captured.payload as any).attr.client_scopes).to.equal('openid profile email');
      } finally {
        restore();
      }
    });
  });

  describe('aliases.createTimeLimited', () => {
    it('posts to add/time_limited_alias with the payload', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['mailbox_modified', 'foo@example.test'] }]);
      try {
        await mcc.aliases.createTimeLimited({ domain: 'example.test', username: 'foo@example.test' });
        expect(captured.url).to.equal('https://example.test/api/v1/add/time_limited_alias');
        expect(captured.payload).to.deep.equal({ domain: 'example.test', username: 'foo@example.test' });
      } finally {
        restore();
      }
    });
  });

  describe('aliases.getTimeLimited', () => {
    it('hits get/time_limited_aliases/{mailbox} and returns the array', async () => {
      const captured: Captured = {};
      const alias = {
        address: 'abc.def@example.test',
        goto: 'foo@example.test',
        description: '',
        validity: 1893456000,
        created: '2026-01-01 00:00:00',
        modified: null,
        permanent: '0',
      };
      const restore = withMockedAxios(captured, [alias]);
      try {
        const res = await mcc.aliases.getTimeLimited('foo@example.test');
        expect(captured.url).to.equal('https://example.test/api/v1/get/time_limited_aliases/foo@example.test');
        expect(res).to.deep.equal([alias]);
      } finally {
        restore();
      }
    });
  });

  describe('aliases.editTimeLimited', () => {
    it('posts to edit/time_limited_alias with address + validity', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['mailbox_modified', 'foo@example.test'] }]);
      try {
        await mcc.aliases.editTimeLimited({ address: 'abc.def@example.test', validity: 24 });
        expect(captured.url).to.equal('https://example.test/api/v1/edit/time_limited_alias');
        expect(captured.payload).to.deep.equal({ address: 'abc.def@example.test', validity: 24 });
      } finally {
        restore();
      }
    });

    it('accepts permanent as an alternative to validity', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['mailbox_modified', 'foo@example.test'] }]);
      try {
        await mcc.aliases.editTimeLimited({ address: ['abc.def@example.test'], permanent: true });
        expect(captured.payload).to.deep.equal({ address: ['abc.def@example.test'], permanent: true });
      } finally {
        restore();
      }
    });
  });

  describe('aliases.deleteTimeLimited', () => {
    it('posts to delete/time_limited_alias with the address payload', async () => {
      const captured: Captured = {};
      const restore = withMockedAxios(captured, [{ type: 'success', msg: ['mailbox_modified', 'foo@example.test'] }]);
      try {
        await mcc.aliases.deleteTimeLimited({ address: 'abc.def@example.test' });
        expect(captured.url).to.equal('https://example.test/api/v1/delete/time_limited_alias');
        expect(captured.payload).to.deep.equal({ address: 'abc.def@example.test' });
      } finally {
        restore();
      }
    });
  });
});
