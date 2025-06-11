import { Alias, AliasDeleteRequest, AliasPostRequest, AliasEditRequest, MailcowResponse } from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from '../request-factory';

/**
 * Interface for all Alias endpoints.
 */
export interface AliasEndpoints {
  /**
   * Endpoint for getting mailbox aliases in the system.
   * @param id - The id of the alias you want to get. Use 'all' to retrieve all aliases in the system.
   */
  get(id?: number | 'all'): Promise<Alias[]>;

  /**
   * Endpoint for creating mailbox aliases.
   * @param payload - The creation payload.
   */
  create(payload: AliasPostRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a mailbox alias.
   * @param payload - The edit payload.
   */
  edit(payload: AliasEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for deleting a mailbox alias.
   * @param payload - The deletion payload.
   */
  delete(payload: AliasDeleteRequest): Promise<MailcowResponse>;
}

/**
 * Binder function between the MailcowClient class and the AliasEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function aliasEndpoints(bind: MailcowClient): AliasEndpoints {
  return {
    get(id = 'all'): Promise<Alias[]> {
      return wrapPromiseToArray<Alias>(bind.requestFactory.get<Alias[] | Alias>(`/api/v1/get/alias/${id}`));
    },
    create: (payload: AliasPostRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, AliasPostRequest>('/api/v1/add/alias', payload);
    },
    edit: (payload: AliasEditRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, AliasEditRequest>('/api/v1/edit/alias', payload);
    },
    delete: (payload: AliasDeleteRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, number[]>('/api/v1/delete/alias', payload.items);
    },
  };
}
