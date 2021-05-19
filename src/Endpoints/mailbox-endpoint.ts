import {
  ACLEditRequest,
  MailboxDeleteRequest,
  MailboxEditRequest,
  MailboxPostRequest,
  Mailbox,
  MailcowResponse,
  PushoverEditRequest,
  QuarantaineEditRequest,
  SpamScoreEditRequest
} from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from "../request-factory";

/**
 * Interface for all Mailbox endpoints.
 */
export interface MailboxEndpoints {
  /**
   * Endpoint for creating a mailbox.
   * @param payload - The creation payload.
   */
  create(payload: MailboxPostRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for deleting a mailbox.
   * @param payload - The deletion payload.
   */
  delete(payload: MailboxDeleteRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a mailbox.
   * @param payload
   */
  edit(payload: MailboxEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for getting a mailbox.
   * @param mailbox - The mailbox to get
   */
  get(mailbox: string | 'all'): Promise<Mailbox[]>;

  /**
   * Endpoint for editing a mailbox's pushover settings.
   * @param payload - The edit payload.
   */
  editPushover(payload: PushoverEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a mailbox's quarantine settings.
   * @param payload - The edit payload.
   */
  editQuarantine(payload: QuarantaineEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a mailbox's spam score settings.
   * @param payload - The edit payload.
   */
  editSpamScore(payload: SpamScoreEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a mailbox's ACL settings.
   * @param payload - The edit payload.
   */
  editUserACL(payload: ACLEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint fot getting a mailbox's active sieve.
   * @param mailbox - The mailbox to get.
   */
  getActiveUserSieve(mailbox: string): Promise<string[]>;
}

/**
 * Binder function between the MailcowClient class and the MailboxEndpoints
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function mailboxEndpoints(bind: MailcowClient): MailboxEndpoints {
  return {
    create(payload: MailboxPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/mailbox',
        payload
      );
    },

    delete(payload: MailboxDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/mailbox',
        payload.mailboxes
      );
    },

    edit(payload: MailboxEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/mailbox',
        payload
      );
    },

    get(mailbox: string = 'all'): Promise<Mailbox[]> {
      return wrapPromiseToArray<Mailbox>(
        bind.requestFactory.get<Mailbox[] | Mailbox>(
          `/api/v1/get/mailbox/${ mailbox }`)
      );
    },

    editPushover(payload: PushoverEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/pushover',
        payload
      );
    },

    editQuarantine(payload: QuarantaineEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/quarantine_notification',
        payload
      );
    },

    editSpamScore(payload: SpamScoreEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/spam-score',
        payload
      );
    },

    editUserACL(payload: ACLEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/user-acl',
        payload
      );
    },

    getActiveUserSieve(mailbox: string): Promise<string[]> {
      return bind.requestFactory.get<string[]>(
        `/api/v1/get/active-user-sieve/${ mailbox }`
      );
    }
  };
}
