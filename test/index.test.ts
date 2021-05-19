import MailcowClient from "../src";
import { expect, assert } from "chai";
import { describe } from "mocha";
import { Alias, AliasPostRequest, MailcowResponse } from "../src/types";
import { AliasEditAttributes } from "../src/types";

const mcc: MailcowClient = new MailcowClient("https://demo.mailcow.email/", "390448-22B69F-FA37D9-19701B-6F033F")

async function thenTestOrFail(promise: Promise<any>, test: Function): Promise<void> {
  await promise.then((res: any) => {
    test(res);
  }).catch((err) => {
    assert.fail('expected', 'actual', err);
  });
}

describe("Alias Endpoint tests", (): void => {
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
      await thenTestOrFail(mcc.aliases.edit({ attr: editAttr, items: [id] }), (res: MailcowResponse) => {
        expect(res[0].type).to.be.equal("success")
      })
      await thenTestOrFail(mcc.aliases.get(id), (res: Alias[]) => {
        const alias: Alias = res[0]
        for (let editAttrKey in editAttr) {
          assert((alias as any)[editAttrKey] == (editAttr as any)[editAttrKey])
        }
      })
    });
    it('should delete the previously created alias', async () => {
      await thenTestOrFail(mcc.aliases.delete({ items: [id] }), (res: MailcowResponse) => {
        expect(res[0].type).to.be.equal("success")
      })
    });
  })
})
