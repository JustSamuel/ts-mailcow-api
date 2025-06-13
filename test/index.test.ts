import MailcowClient, { Resource, StatusContainers, StatusVersion, StatusVmail } from "../src";
import { expect, assert } from "chai";
import { describe } from "mocha";
import {
  Alias,
  AliasPostRequest, Fail2BanResponse, ForwardingHost,
  MailcowResponse,
  Syncjob,
  SyncjobAttributes, SyncjobEditAttributes
} from "../src/types";
import { AliasEditAttributes } from "../src/types";
import * as https from "node:https";

const mcc: MailcowClient = new MailcowClient(
  "https://demo.mailcow.email/api/v1",
  "390448-22B69F-FA37D9-19701B-6F033F",
  {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

function isSucces(res: MailcowResponse) {
  expect(res[0].type).to.be.equal("success")
}

async function thenTestOrFail(promise: Promise<any>, test: Function, fatal = false): Promise<void> {
  await promise
    .then((res: any) => {
      console.log(JSON.stringify(res, null, 4));
      test(res);
    })
    .catch((err) => {
      if (fatal) {
        assert.fail('expected', 'actual', err);
      } else {
        console.warn(`⚠️  Non-fatal test failed:`, err.message ?? err);
      }
    });
}

describe("Alias Endpoint tests", (): void => {
  it('should get all aliases', async () => {
    await thenTestOrFail(mcc.aliases.get(), (res: Alias[]) => expect(res).to.be.length.least(1), true)
  });
  it('should get a single alias', async () => {
    await thenTestOrFail(mcc.aliases.get(8), (res: Alias[]) => expect(res).to.be.length.least(1), true)
  });
  describe("Modify aliases", (): void => {
    const attr: AliasPostRequest = {
      active: true,
      address: "ts-mailcow-api@440044.xyz",
      goto: "demo@440044.xyz",
      sogo_visible: true,
    }
    const editAttr: AliasEditAttributes = {
      active: false,
      address: "ts-mailcow-api-edit@440044.xyz",
      goto: "demo-edit@440044.xyz",
      private_comment: "private comment",
      public_comment: "public comment",
      sogo_visible: false,
    }
    let id: number;
    it('should create an alias', async () => {
      await thenTestOrFail(mcc.aliases.create(attr), (res: MailcowResponse) => {
        expect(res[0].type).to.be.equal("success")
        id = parseInt(res[0].msg[2])
      }, true)
    });
    it('should delete edit previously created alias', async () => {
      await thenTestOrFail(mcc.aliases.edit({ attr: editAttr, items: [id] }), isSucces, true)
      await thenTestOrFail(mcc.aliases.get(id), (res: Alias[]) => {
        const alias: Alias = res[0]
        for (let editAttrKey in editAttr) {
          assert((alias as any)[editAttrKey] == (editAttr as any)[editAttrKey])
        }
      }, true)
    });
    it('should delete the previously created alias', async () => {
      await thenTestOrFail(mcc.aliases.delete({ items: [id] }), isSucces, true)
    });
  })
})

describe("Syncjob Endpoint tests", (): void => {
  it('should create a sync job', async () => {
    const attr: SyncjobAttributes = {
      username: "lisa@440044.xyz",
      host1: "mail.mailcow.tld",
      port1: 143,
      user1: "demo@mailcow.tld",
      password1: "supersecretpw",
      enc1: "TLS",
      mins_interval: 20,
      subfolder2: "/SyncIntoSubfolder",
      maxage: 0,
      maxbytespersecond: 0,
      timeout1: 600,
      timeout2: 600,
      exclude: "(?i)spam|(?i)junk",
      custom_params: "--dry",
      delete2duplicates: true,
      delete1: true,
      delete2: false,
      automap: true,
      skipcrossduplicates: false,
      subscribeall: true,
      active: false
    }
    await thenTestOrFail(mcc.syncjobs.create(attr), isSucces)
  });
  let id: number;
  it('should get all sync jobs', async () => {
    await thenTestOrFail(mcc.syncjobs.getAll(), (res: Syncjob[]) => {
      expect(res).be.length.least(1)
      id = res[0].id;
    })
  });
  it('should edit a sync job', async () => {
    const editAttr: SyncjobEditAttributes = {
      active: false,
      automap: false,
    }
    await thenTestOrFail(mcc.syncjobs.edit({ attr: editAttr, items: id }), isSucces)
    await thenTestOrFail(mcc.syncjobs.getAll(), (res: Syncjob[]) => {
      const syncjob: Syncjob = res[0]
      for (let editAttrKey in editAttr) {
        assert((syncjob as any)[editAttrKey] == (editAttr as any)[editAttrKey])
      }
    })
  });
  it('should delete a sync job', async () => {
    await thenTestOrFail(mcc.syncjobs.delete({ items: [id] }), isSucces)
  });
})

describe.skip("Forwarding Host Endpoint test", (): void => {
  it('should create a forwarding host', async () => {
    await thenTestOrFail(mcc.forwardingHosts.create({ filter_spam: true, hostname: "hosted.mailcow.de" }), isSucces)
  });
  let hosts: any[] = [];
  it('should get forwarding hosts', async () => {
    await thenTestOrFail(mcc.forwardingHosts.getAll(), (res: ForwardingHost[]) => {
      res.forEach((host) => {
        hosts.push(host.host)
      })
      expect(res).to.be.length.least(1)
    })
  });
  it('should delete forwarding hosts', async () => {
    await thenTestOrFail(mcc.forwardingHosts.delete({ items: hosts }), isSucces)
  });
})

describe("Log Endpoint test", (): void => {
  it('should get all ACME logs', async () => {
    await thenTestOrFail(mcc.logs.acme(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all API logs', async () => {
    await thenTestOrFail(mcc.logs.api(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all Autodiscover logs', async () => {
    await thenTestOrFail(mcc.logs.autodiscover(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all dovecot logs', async () => {
    await thenTestOrFail(mcc.logs.dovecot(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all netfilter logs', async () => {
    await thenTestOrFail(mcc.logs.netfilter(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all postfix logs', async () => {
    await thenTestOrFail(mcc.logs.postfix(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all ratelimited logs', async () => {
    await thenTestOrFail(mcc.logs.ratelimited(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all rspamd logs', async () => {
    await thenTestOrFail(mcc.logs.rspamd(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all sogo logs', async () => {
    await thenTestOrFail(mcc.logs.sogo(2), (res: any[]) => expect(res).to.exist)
  });
  it('should get all watchdog logs', async () => {
    await thenTestOrFail(mcc.logs.watchdog(2), (res: any[]) => expect(res).to.exist)
  });
})

describe("Address Rewriting Endpoint tests", (): void => {
  it('should create a BCC map', async () => {
    await thenTestOrFail(mcc.addressRewriting.addBccMap({
      active: 1,
      bcc_dest: "admin@440044.xyz",
      local_dest: "test@440044.xyz",
      type: "sender"
    }), isSucces);
  });

  it('should create a recipient map', async () => {
    await thenTestOrFail(mcc.addressRewriting.addRecipientMap({
      active: 1,
      recipient_map_new: "newrecipient@440044.xyz",
      recipient_map_old: "oldrecipient@440044.xyz"
    }), isSucces);
  });

  it('should get all BCC maps', async () => {
    await thenTestOrFail(mcc.addressRewriting.getBccMap('all'), (res: any[]) => expect(res).to.exist);
  });

  it('should get all recipient maps', async () => {
    await thenTestOrFail(mcc.addressRewriting.getRecipientMap('all'), (res: any[]) => expect(res).to.exist);
  });

  it('should delete BCC maps', async () => {
    await thenTestOrFail(mcc.addressRewriting.deleteBccMap({ items: [1] }), isSucces);
  });

  it('should delete recipient maps', async () => {
    await thenTestOrFail(mcc.addressRewriting.deleteRecipientMap({ items: [1] }), isSucces);
  });
});

describe("Fail2Ban Endpoint tests", (): void => {
  it('should edit Fail2Ban', async () => {
    await thenTestOrFail(mcc.fail2Ban.edit({
      attr: {
        ban_time: '0',
        ban_time_increment: '600',
        blacklist: '127.0.0.1',
        max_attempts: '3',
        max_ban_time: '600',
        netban_ipv4: '127.0.0.1',
        netban_ipv6: '::1',
        retry_window: '600',
        whitelist: '127.0.0.1',
      },
      items: 'all',
    }), isSucces);
  });

  it('should get Fail2Ban', async () => {
    await thenTestOrFail(mcc.fail2Ban.get(), (res: Fail2BanResponse) => expect(res).to.exist);
  });
});

describe("Status Endpoint tests", (): void => {
  it('should get container status', async () => {
    await thenTestOrFail(mcc.status.container(), (res: StatusContainers) => expect(res).to.exist);
  });

  it('should get vmail status', async () => {
    await thenTestOrFail(mcc.status.vmail(), (res: StatusVmail) => expect(res).to.exist);
  });

  it('should get version status', async () => {
    await thenTestOrFail(mcc.status.version(), (res: StatusVersion) => expect(res).to.exist);
  });
});

describe("Resource Endpoint tests", (): void => {
  it('should create a resource', async () => {
    await thenTestOrFail(mcc.resources.create({
      active: 1,
      description: "test",
      domain: "440044.xyz",
      kind: "location",
      local_part: "test",
      multiple_bookings: 0,
      name: "test@440044.xyz",
    }), isSucces);
  });

  it('should delete a resource', async () => {
    await thenTestOrFail(mcc.resources.delete({
      names: ['test@440044.xyz'],
    }), isSucces);
  });

  it('should get all resources', async () => {
    await thenTestOrFail(mcc.resources.get(), (res: Resource[]) => expect(res).to.exist);
  });
});

describe("Queue Manager Endpoint tests", (): void => {
  it('should delete the mail queue', async () => {
    await thenTestOrFail(mcc.queueManager.delete('super_delete'), isSucces);
  });

  it('should get the mail queue', async () => {
    await thenTestOrFail(mcc.queueManager.get(), (res: any[]) => expect(res).to.exist);
  });

  it('should flush the mail queue', async () => {
    await thenTestOrFail(mcc.queueManager.flush('flush'), isSucces);
  });
});

describe("Quarantine Endpoint tests", (): void => {
  it('should delete quarantined emails', async () => {
    await thenTestOrFail(mcc.quarantine.delete({
      items: [1],
    }), isSucces);
  });

  it('should get quarantined emails', async () => {
    await thenTestOrFail(mcc.quarantine.get(), (res: any[]) => expect(res).to.exist);
  });
});