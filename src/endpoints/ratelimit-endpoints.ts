import { DomainRatelimit, EditDomainRequest, EditMailboxRequest, MailboxRatelimit, MailcowResponse } from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from '../request-factory';

/**
 * Interface for all Rate Limit endpoints related to email handling in Mailcow.
 */
export interface RatelimitsEndpoints {
  /**
   * Edits the rate limits for specified domains.
   * @param payload - Object containing rate limit attributes and list of domain names.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  editDomain(payload: EditDomainRequest): Promise<MailcowResponse>;

  /**
   * Edits the rate limits for specified mailboxes.
   * @param payload - Object containing rate limit attributes and list of mailbox names.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  editMailbox(payload: EditMailboxRequest): Promise<MailcowResponse>;

  /**
   * Retrieves the rate limits for a specified domain or all domains.
   */
  getDomain(domain: string): Promise<DomainRatelimit[]>;
  getDomain(domain: 'all'): Promise<DomainRatelimit[]>;

  /**
   * Retrieves the rate limits for a specified mailbox or all mailboxes.
   */
  getMailbox(mailbox: string): Promise<MailboxRatelimit[]>;
  getMailbox(mailbox: 'all'): Promise<MailboxRatelimit[]>;
}

const RATELIMITS_ENDPOINTS = {
  EDIT_DOMAIN: 'edit/rl-domain/',
  EDIT_MAILBOX: 'edit/rl-mbox/',
  GET_DOMAIN: 'get/rl-domain/',
  GET_MAILBOX: 'get/rl-mbox/',
};

/**
 * Binder function between the MailcowClient class and the RatelimitsEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function ratelimitsEndpoints(bind: MailcowClient): RatelimitsEndpoints {
  return {
    editDomain(payload: EditDomainRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, EditDomainRequest>(RATELIMITS_ENDPOINTS.EDIT_DOMAIN, payload);
    },
    editMailbox(payload: EditMailboxRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, EditMailboxRequest>(RATELIMITS_ENDPOINTS.EDIT_MAILBOX, payload);
    },
    getDomain(domain: string = 'all'): Promise<DomainRatelimit[]> {
      return wrapPromiseToArray<DomainRatelimit>(
        bind.requestFactory.get<DomainRatelimit[] | DomainRatelimit>(`${RATELIMITS_ENDPOINTS.GET_DOMAIN}${domain}`),
      );
    },
    getMailbox(mailbox: string = 'all'): Promise<MailboxRatelimit[]> {
      return wrapPromiseToArray<MailboxRatelimit>(
        bind.requestFactory.get<MailboxRatelimit[] | MailboxRatelimit>(`${RATELIMITS_ENDPOINTS.GET_MAILBOX}${mailbox}`),
      );
    },
  };
}
