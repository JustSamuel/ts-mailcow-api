import MailCowClient from "../index";
import requestFactory from "../request-factory";
import {
    ACLEditRequest,
    MailboxDeleteRequest, MailboxEditRequest,
    MailboxPostRequest, MailboxResponse,
    MailcowResponse, PushoverEditRequest, QuarantaineEditRequest, SpamScoreEditRequest
} from "../types";

export default {
    createMailbox: function (this: MailCowClient, payload: MailboxPostRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/add/mailbox`, payload, this.HEADERS);
    },

    deleteMailbox: function (this: MailCowClient, payload: MailboxDeleteRequest): Promise<MailcowResponse> {
        return requestFactory.delete<MailcowResponse>(`${this.BASE_URL}/delete/mailbox`, payload.domains, this.HEADERS);
    },

    editMailbox: function (this: MailCowClient, payload: MailboxEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/mailbox`, payload, this.HEADERS);
    },

    getMailbox: function (this: MailCowClient, mailbox: string = "all"): Promise<MailboxResponse[]> {
        return requestFactory.get<MailboxResponse[]>(`${this.BASE_URL}/get/mailbox/${mailbox}`, this.HEADERS);
    },

    editPushover: function (this: MailCowClient, payload: PushoverEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/pushover`, payload, this.HEADERS);
    },

    editQuarantine: function (this: MailCowClient, payload: QuarantaineEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/quarantine_notification`, payload, this.HEADERS);
    },

    editSpamScore: function (this: MailCowClient, payload: SpamScoreEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/spam-score`, payload, this.HEADERS);
    },

    editUserACL: function (this: MailCowClient, payload: ACLEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/user-acl`, payload, this.HEADERS);
    },

    getActiveUserSieve: function (this: MailCowClient, username: string): Promise<string[]> {
        return requestFactory.get<string[]>(`${this.BASE_URL}/get/active-user-sieve/${username}`, this.HEADERS);
    },
}