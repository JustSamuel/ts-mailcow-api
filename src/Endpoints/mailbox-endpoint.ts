import {
  ACLEditRequest,
  MailboxDeleteRequest,
  MailboxEditRequest,
  MailboxPostRequest,
  MailboxResponse,
  MailcowResponse,
  PushoverEditRequest,
  QuarantaineEditRequest,
  SpamScoreEditRequest
} from '../types';
import MailcowClient from '../index';

export default function MailboxEndpoints(bind: MailcowClient) {
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
        payload.domains
      );
    },

    edit(payload: MailboxEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/mailbox',
        payload
      );
    },

    get(mailbox: string = 'all'): Promise<MailboxResponse[]> {
      return bind.requestFactory.get<MailboxResponse[]>(
        `/api/v1/get/mailbox/${ mailbox }`
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

    getActiveUserSieve(username: string): Promise<string[]> {
      return bind.requestFactory.get<string[]>(
        `/api/v1/get/active-user-sieve/${ username }`
      );
    }
  };
}
