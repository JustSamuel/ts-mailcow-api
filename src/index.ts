/**
 * @module MailcowClient
 */

import { AxiosRequestConfig } from 'axios';
import domainEndpoints from './Endpoints/domain-endpoints';
import antiSpamEndpoints from './Endpoints/antispam-endpoints';
import mailboxEndpoints from './Endpoints/mailbox-endpoint';
import RequestFactory from './request-factory';
import { aliasEndpoints, AliasEndpoints } from './Endpoints/alias-endpoints';

/**
 * Class containing all the logic to interface with the Mailcow API in TypeScript.
 * @external
 */
class MailcowClient {
  /**
   * The base URL of the Mailcow API.
   */
  readonly BASE_URL: string;

  /**
   * The API key of the Mailcow API.
   */
  readonly API_KEY: string;

  HEADERS: {};

  /**
   * Creates a MailcowClient using the given URL and API key.
   * @param BASE_URL - The base URL of the Mailcow API.
   * @param API_KEY  - The API key of the Mailcow API.
   */
  constructor(BASE_URL: string, API_KEY: string) {
    this.BASE_URL = BASE_URL;
    this.API_KEY = API_KEY;

    // Set the correct Axios headers.
    this.HEADERS = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.API_KEY
      }
    } as AxiosRequestConfig;
  }

  public requestFactory = new RequestFactory(this)

  /**
   * All endpoints related to Aliases.
   */
  public aliases: AliasEndpoints = aliasEndpoints(this)

  public domains = domainEndpoints(this)

  public spamPolicy = antiSpamEndpoints(this)

  public mailbox = mailboxEndpoints(this)
}

export default MailcowClient;
