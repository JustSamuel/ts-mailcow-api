/**
 * @module MailcowClient
 */

import { AxiosRequestConfig } from 'axios';
import { domainEndpoints, DomainEndpoints } from './Endpoints/domain-endpoints';
import { antiSpamEndpoints, AntiSpamEndpoints } from './Endpoints/antispam-endpoints';
import { mailboxEndpoints, MailboxEndpoints } from './Endpoints/mailbox-endpoint';
import RequestFactory from './request-factory';
import { aliasEndpoints, AliasEndpoints } from './Endpoints/alias-endpoints';
import { syncjobEndpoints, SyncjobEndpoints } from './Endpoints/syncjob-endpoints';
import { forwardingEndpoints, ForwardingEndpoints } from './Endpoints/forwarding-endpoints';
import { logEndpoints, LogEndpoints } from './Endpoints/log-endpoints';
import { addressRewritingEndpoints, AdressRewritingEndpoints } from './Endpoints/address-rewriting-endpoint';
import { Fail2BanEndpoints, fail2BanEndpoints } from './Endpoints/fail2ban-endpoints';

/**
 * Class containing all the logic to interface with the Mailcow API in TypeScript.
 * @external
 */
class MailcowClient {
  /**
   * The base URL of the Mailcow API.
   * @internal
   */
  readonly BASE_URL: string;

  /**
   * The API key of the Mailcow API.
   * @internal
   */
  readonly API_KEY: string;

  /**
   * The request config used for every request.
   * @internal
   */
  AXIOS_CONFIG: AxiosRequestConfig;

  /**
   * Creates a MailcowClient using the given URL and API key.
   * @param BASE_URL - The base URL of the Mailcow API.
   * @param API_KEY  - The API key of the Mailcow API.
   * @param EXTRA_AXIOS_CONFIG - Allows for setting extra Axios request config such as keep alive.
   */
  constructor(BASE_URL: string, API_KEY: string, EXTRA_AXIOS_CONFIG?: AxiosRequestConfig) {
    this.BASE_URL = BASE_URL.charAt(BASE_URL.length - 1) === '/' ? BASE_URL : BASE_URL.concat('/');
    this.API_KEY = API_KEY;

    // Set the correct Axios request config.
    this.AXIOS_CONFIG = {
      ...EXTRA_AXIOS_CONFIG,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.API_KEY,
      },
    };
  }

  /**
   * Factory method pattern for creating HTTP requests.
   * @internal
   */
  public requestFactory = new RequestFactory(this);

  /**
   * All endpoints related to Aliases.
   * See {@link AliasEndpoints}
   */
  public aliases: AliasEndpoints = aliasEndpoints(this);

  /**
   * All endpoints related to Domains.
   * See {@link DomainEndpoints}
   * @external
   */
  public domains: DomainEndpoints = domainEndpoints(this);

  /**
   * All endpoints related to spam policies.
   * See {@link AntiSpamEndpoints}
   * @external
   */
  public spamPolicy: AntiSpamEndpoints = antiSpamEndpoints(this);

  /**
   * All endpoints related to mailboxes.
   * See {@link MailboxEndpoints}
   * @external
   */
  public mailbox: MailboxEndpoints = mailboxEndpoints(this);

  /**
   * All endpoints related to sync jobs.
   * See {@link SyncjobEndpoints}
   * @external
   */
  public syncjobs: SyncjobEndpoints = syncjobEndpoints(this);

  /**
   * All endpoints related to forwarding hosts.
   * See {@link ForwardingEndpoints}
   * @external
   */
  public forwardingHosts: ForwardingEndpoints = forwardingEndpoints(this);

  /**
   * All endpoints related to address rewriting.
   * See {@link AdressRewritingEndpoints}
   * @external
   */
  public addressRewriting: AdressRewritingEndpoints = addressRewritingEndpoints(this);

  /**
   * All endpoints related to logs.
   * See {@link LogEndpoints}
   * @external
   */
  public logs: LogEndpoints = logEndpoints(this);

  /**
   * All endpoints related to fail2ban.
   * See {@link Fail2BanEndpoints}
   * @external
   */
  public fail2Ban: Fail2BanEndpoints = fail2BanEndpoints(this);
}

export default MailcowClient;
