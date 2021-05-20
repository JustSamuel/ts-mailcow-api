import MailcowClient from "../src";
import { expect, assert } from "chai";
import { describe } from "mocha";
import {
  Alias,
  AliasPostRequest,
  MailcowResponse,
  Syncjob,
  SyncjobAttributes, SyncjobEditAttributes
} from "../src/types";
import { AliasEditAttributes } from "../src/types";

const mcc: MailcowClient = new MailcowClient("https://demo.mailcow.email/", "390448-22B69F-FA37D9-19701B-6F033F")

function isSucces(res: MailcowResponse) {
  expect(res[0].type).to.be.equal("success")
}

async function thenTestOrFail(promise: Promise<any>, test: Function): Promise<void> {
  await promise.then((res: any) => {
    // console.log(res)
    test(res);
  }).catch((err) => {
    assert.fail('expected', 'actual', err);
  });
}

describe.skip("Alias Endpoint tests", (): void => {
  it('should get all aliases', async () => {
    await thenTestOrFail(mcc.aliases.get(), (res: Alias[]) => expect(res).to.be.length.least(1))
  });
  it('should get a single alias', async () => {
    await thenTestOrFail(mcc.aliases.get(8), (res: Alias[]) => expect(res).to.be.length.least(1))
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
      })
    });
    it('should delete edit previously created alias', async () => {
      await thenTestOrFail(mcc.aliases.edit({ attr: editAttr, items: [id] }), isSucces)
      await thenTestOrFail(mcc.aliases.get(id), (res: Alias[]) => {
        const alias: Alias = res[0]
        for (let editAttrKey in editAttr) {
          assert((alias as any)[editAttrKey] == (editAttr as any)[editAttrKey])
        }
      })
    });
    it('should delete the previously created alias', async () => {
      await thenTestOrFail(mcc.aliases.delete({ items: [id] }), isSucces)
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
  it('should get all sync jobs',  async () => {
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
    await thenTestOrFail(mcc.syncjobs.edit({attr: editAttr, items: id}), isSucces)
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
