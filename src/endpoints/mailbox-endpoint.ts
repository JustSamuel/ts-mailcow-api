import {
  ACLEditRequest,
  MailboxDeleteRequest,
  MailboxEditRequest,
  MailboxPostRequest,
  Mailbox,
  MailcowResponse,
  PushoverEditRequest,
  QuarantaineEditRequest,
  SpamScoreEditRequest,
} from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from '../request-factory';

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
  get(mailbox: 'all'): Promise<Mailbox[]>;
  get(mailbox: string): Promise<Mailbox[]>;

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

const MAILBOX_ENDPOINTS = {
  CREATE: 'add/mailbox',
  DELETE: 'delete/mailbox',
  EDIT: 'edit/mailbox',
  GET: 'get/mailbox',
  EDIT_PUSHOVER: 'edit/pushover',
  EDIT_QUARANTAINE: 'edit/quarantine_notification',
  EDIT_SPAM_SCORE: 'edit/spam-score',
  EDIT_USER_ACL: 'edit/user-acl',
  GET_ACTIVE_USER_SIEVE: 'get/active-user-sieve',
};

/**
 * Binder function between the MailcowClient class and the MailboxEndpoints
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function mailboxEndpoints(bind: MailcowClient): MailboxEndpoints {
  return {
    create(payload: MailboxPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, MailboxPostRequest>(MAILBOX_ENDPOINTS.CREATE, payload);
    },

    delete(payload: MailboxDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(MAILBOX_ENDPOINTS.DELETE, payload.mailboxes);
    },

    edit(payload: MailboxEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, MailboxEditRequest>(MAILBOX_ENDPOINTS.EDIT, payload);
    },

    get(mailbox: string = 'all'): Promise<Mailbox[]> {
      return wrapPromiseToArray<Mailbox>(
        bind.requestFactory.get<Mailbox[] | Mailbox>(MAILBOX_ENDPOINTS.GET + `/${mailbox}`),
      );
    },

    editPushover(payload: PushoverEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, PushoverEditRequest>(MAILBOX_ENDPOINTS.EDIT_PUSHOVER, payload);
    },

    editQuarantine(payload: QuarantaineEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, QuarantaineEditRequest>('edit/quarantine_notification', payload);
    },

    editSpamScore(payload: SpamScoreEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, SpamScoreEditRequest>(
        MAILBOX_ENDPOINTS.EDIT_SPAM_SCORE,
        payload,
      );
    },

    editUserACL(payload: ACLEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, ACLEditRequest>(MAILBOX_ENDPOINTS.EDIT_USER_ACL, payload);
    },

    getActiveUserSieve(mailbox: string): Promise<string[]> {
      return bind.requestFactory.get<string[]>(MAILBOX_ENDPOINTS.GET_ACTIVE_USER_SIEVE + `/${mailbox}`);
    },
  };
}
