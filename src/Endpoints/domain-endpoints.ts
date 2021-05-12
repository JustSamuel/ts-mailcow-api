import MailCowClient from "../index";
import requestFactory from "../request-factory";
import {DomainDeleteRequest, DomainEditRequest, DomainPostRequest, DomainResponse, MailcowResponse} from "../types";

export default {
    createDomain: function (this: MailCowClient, payload: DomainPostRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/add/domain`, payload, this.HEADERS)
    },

    deleteDomain: function (this: MailCowClient, payload: DomainDeleteRequest): Promise<MailcowResponse> {
        return requestFactory.delete<MailcowResponse>(`${this.BASE_URL}/delete/domain`, payload.domains, this.HEADERS)
    },

    editDomain: function (this: MailCowClient, payload: DomainEditRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/domain`, payload, this.HEADERS)
    },

    getDomain: function (this: MailCowClient, domain: string = "all"): Promise<DomainResponse | DomainResponse[]> {
        return requestFactory.get<DomainResponse>(`${this.BASE_URL}/get/domain/${domain}`, this.HEADERS)
    }
}