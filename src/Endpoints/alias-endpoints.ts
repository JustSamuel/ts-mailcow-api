import { AliasDeleteRequest, AliasPostRequest, AliasResponse, AliasUpdateRequest, MailcowResponse } from '../types';
import MailcowClient from '../index';

export interface AliasInterface {
  /**
   * Get mailbox aliases existing in system.
   * @param id - The id of the alias you want to get. Use 'all' to retrieve all aliases in the system.
   */
  get: (id?: number | 'all') => Promise<AliasResponse[] | AliasResponse>,
  create: any,
  update: any,
  delete: any,
}

export default function AliasEndpoints(bind: MailcowClient): AliasInterface {
  return {
    get(id = 'all'): Promise<AliasResponse[]> {
      return  bind.requestFactory.get<AliasResponse[]>(
        `/api/v1/get/alias/${ id }`,
      );
    },
    create: (payload: AliasPostRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/alias',
        payload
      );
    },
    update: (payload: AliasUpdateRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/alias',
        payload
      );
    },
    delete: (payload: AliasDeleteRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/alias',
        payload.items
      );
    }
  };
}
