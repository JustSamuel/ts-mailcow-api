import {
  Alias,
  AliasDeleteRequest,
  AliasPostRequest,
  AliasUpdateRequest,
  MailcowResponse
} from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from '../request-factory';

export interface AliasEndpoints {
  /**
   * Endpoint for getting mailbox aliases in the system.
   * @param id - The id of the alias you want to get. Use 'all' to retrieve all aliases in the system.
   *
   * @example Get all aliases:
   * ```typescript
   * mcc.aliases.get('all').then((res) => { console.log(res); });
   * ```
   * @example Get a single alias:
   * ```typescript
   * mcc.aliases.get(8).then((res) => { console.log(res); });
   * ```
   */
  get: (id?: number | 'all') => Promise<Alias[]>,

  /**
   * Endpoint for creating mailbox aliases.
   * @param payload - View {@link AliasAttributes} for payload parameters.
   */
  create: (payload: AliasPostRequest) => Promise<MailcowResponse>,
  /**
   * Update for editing a mailbox alias.
   * @param payload -
   */
  update: (payload: AliasUpdateRequest) => Promise<MailcowResponse>,
  delete: (payload: AliasDeleteRequest) => Promise<MailcowResponse>,
}

export function aliasEndpoints(bind: MailcowClient): AliasEndpoints {
  return {
    get(id = 'all'): Promise<Alias[]> {
      return wrapPromiseToArray<Alias>(
        bind.requestFactory.get<Alias[] | Alias>(
          `/api/v1/get/alias/${ id }`
        ));
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
