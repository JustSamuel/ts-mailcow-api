import MailCowClient from "../index";
import {
    SpamPolicyDeleteRequest,
    SpamPolicyPostRequest,
    MailcowResponse,
    SpamPolicyGetRequest,
    SpamPolicyResponse
} from "../types";
import requestFactory from "../request-factory";

export default {
    createSpamPolicy: function (this: MailCowClient, payload: SpamPolicyPostRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/add/domain-policy`, payload, this.HEADERS)
    },

    deleteSpamPolicy: function (this: MailCowClient, payload: SpamPolicyDeleteRequest): Promise<MailcowResponse> {
        return requestFactory.delete<MailcowResponse>(`${this.BASE_URL}/delete/domain-policy`, payload.prefid, this.HEADERS)
    },

    getSpamPolicyList: function (this: MailCowClient, payload: SpamPolicyGetRequest): Promise<SpamPolicyResponse[]> {
        return requestFactory.get<SpamPolicyResponse[]>(`${this.BASE_URL}/get/policy_${payload.type}_domain/${payload.domain}`, this.HEADERS)
    },
}