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

const ALIAS_ENDPOINTS = {
  GET: 'get/alias',
  ADD: 'add/alias',
  EDIT: 'edit/alias',
  DELETE: 'delete/alias',
};

/**
 * Binder function between the MailcowClient class and the AliasEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function aliasEndpoints(bind: MailcowClient): AliasEndpoints {
  return {
    get(id = 'all'): Promise<Alias[]> {
      return wrapPromiseToArray<Alias>(bind.requestFactory.get<Alias[] | Alias>(ALIAS_ENDPOINTS.GET + `/${id}`));
    },
    create: (payload: AliasPostRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, AliasPostRequest>(ALIAS_ENDPOINTS.ADD, payload);
    },
    edit: (payload: AliasEditRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, AliasEditRequest>(ALIAS_ENDPOINTS.EDIT, payload);
    },
    delete: (payload: AliasDeleteRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, number[]>(ALIAS_ENDPOINTS.DELETE, payload.items);
    },
  };
}
