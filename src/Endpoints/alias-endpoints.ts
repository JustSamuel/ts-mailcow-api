import MailCowClient from "../index";
import {
    AliasDeleteRequest,
    AliasPostRequest,
    AliasResponse, AliasUpdateRequest, MailcowResponse,
} from "../types";
import requestFactory from "../request-factory";

export default {
    getAliases: function (this: MailCowClient, id = "all"): Promise<AliasResponse[]> {
        return requestFactory.get<AliasResponse[]>(`${this.BASE_URL}/get/alias/${id}`, this.HEADERS)
    },

    createAlias: function (this: MailCowClient, payload: AliasPostRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/add/alias`, payload, this.HEADERS)
    },

    updateAlias: function (this: MailCowClient, payload: AliasUpdateRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/edit/alias`, payload, this.HEADERS)
    },

    deleteAlias: function (this: MailCowClient, payload: AliasDeleteRequest): Promise<MailcowResponse> {
        return requestFactory.post<MailcowResponse>(`${this.BASE_URL}/delete/alias`, payload.items, this.HEADERS)
    },
}