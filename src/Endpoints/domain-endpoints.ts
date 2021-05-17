import { DomainDeleteRequest, DomainEditRequest, DomainPostRequest, DomainResponse, MailcowResponse } from '../types';
import MailcowClient from '../index';

export default function DomainEndpoints(bind: MailcowClient) {
  return {
    create(payload: DomainPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/domain',
        payload
      );
    },

    delete(payload: DomainDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/domain',
        payload.domains
      );
    },

    edit(payload: DomainEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/domain',
        payload
      );
    },

    get(domain: string = 'all'): Promise<DomainResponse | DomainResponse[]> {
      return bind.requestFactory.get<DomainResponse>(
        `/api/v1/get/domain/${ domain }`
      );
    }
  };
}
