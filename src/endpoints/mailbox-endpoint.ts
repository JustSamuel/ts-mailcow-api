import {
  ACLEditRequest,
  MailboxCustomAttributeEditRequest,
  MailboxDeleteRequest,
  MailboxEditRequest,
  MailboxPostRequest,
  MailboxTagDeleteRequest,
  Mailbox,
  MailcowResponse,
  PushoverEditRequest,
  QuarantineEditRequest,
  SpamScoreEditRequest,
  SpamScoreGetResponse,
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
  editQuarantine(payload: QuarantineEditRequest): Promise<MailcowResponse>;

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

  /**
   * Endpoint for removing one or more tags from a mailbox.
   * @param mailbox - The mailbox to remove tags from.
   * @param payload - The tags to remove.
   */
  deleteTag(mailbox: string, payload: MailboxTagDeleteRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for writing custom attributes on one or more mailboxes.
   * @param payload - The edit payload.
   */
  editCustomAttribute(payload: MailboxCustomAttributeEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for reading a mailbox's spam score override.
   * @param mailbox - The mailbox to get the score for, or omit/empty for
   * the global score (admin only).
   */
  getSpamScore(mailbox?: string): Promise<SpamScoreGetResponse>;

  /**
   * Endpoint for listing all mailboxes belonging to a specific domain.
   * @param domain - The domain to filter mailboxes by.
   */
  getByDomain(domain: string): Promise<Mailbox[]>;
}

const MAILBOX_ENDPOINTS = {
  CREATE: 'add/mailbox',
  DELETE: 'delete/mailbox',
  DELETE_TAG: 'delete/mailbox/tag',
  EDIT: 'edit/mailbox',
  GET: 'get/mailbox',
  EDIT_PUSHOVER: 'edit/pushover',
  EDIT_QUARANTINE: 'edit/quarantine_notification',
  EDIT_SPAM_SCORE: 'edit/spam-score',
  EDIT_USER_ACL: 'edit/user-acl',
  EDIT_CUSTOM_ATTRIBUTE: 'edit/mailbox/custom-attribute',
  GET_ACTIVE_USER_SIEVE: 'get/active-user-sieve',
  GET_SPAM_SCORE: 'get/spam-score',
  GET_ALL_BY_DOMAIN: 'get/mailbox/all',
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

    editQuarantine(payload: QuarantineEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, QuarantineEditRequest>(
        MAILBOX_ENDPOINTS.EDIT_QUARANTINE,
        payload,
      );
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

    deleteTag(mailbox: string, payload: MailboxTagDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, MailboxTagDeleteRequest>(
        MAILBOX_ENDPOINTS.DELETE_TAG + `/${mailbox}`,
        payload,
      );
    },

    editCustomAttribute(payload: MailboxCustomAttributeEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, MailboxCustomAttributeEditRequest>(
        MAILBOX_ENDPOINTS.EDIT_CUSTOM_ATTRIBUTE,
        payload,
      );
    },

    getSpamScore(mailbox: string = ''): Promise<SpamScoreGetResponse> {
      return bind.requestFactory.get<SpamScoreGetResponse>(MAILBOX_ENDPOINTS.GET_SPAM_SCORE + `/${mailbox}`);
    },

    getByDomain(domain: string): Promise<Mailbox[]> {
      return wrapPromiseToArray<Mailbox>(
        bind.requestFactory.get<Mailbox[] | Mailbox>(MAILBOX_ENDPOINTS.GET_ALL_BY_DOMAIN + `/${domain}`),
      );
    },
  };
}
