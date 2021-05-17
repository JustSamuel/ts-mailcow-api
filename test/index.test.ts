import MailcowClient from "../src";
import { expect } from "chai";
import { describe } from "mocha";

const mcc: MailcowClient = new MailcowClient("https://demo.mailcow.email/", "390448-22B69F-FA37D9-19701B-6F033F")

describe("Alias Endpoint tests", (): void => {
  it('should get all aliases', (): void => {
    mcc.aliases.get().then((res) => {
      expect(res).to.be.length.least(1)
    })
  });
  it('should get a single alias', (): void => {
    mcc.aliases.get(8).then((res) => {
      expect(res).to.be.length(1)
    })
  });
})

