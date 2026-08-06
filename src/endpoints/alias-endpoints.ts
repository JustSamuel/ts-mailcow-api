import {
  Alias,
  AliasDeleteRequest,
  AliasPostRequest,
  AliasEditRequest,
  MailcowResponse,
  TimeLimitedAlias,
  TimeLimitedAliasDeleteRequest,
  TimeLimitedAliasEditRequest,
  TimeLimitedAliasPostRequest,
} from '../types';
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

  /**
   * Endpoint for creating a time-limited (burner) alias. Mailcow always
   * generates the address itself -- there is no way to request a specific
   * one.
   * @param payload - The creation payload.
   */
  createTimeLimited(payload: TimeLimitedAliasPostRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for listing the active time-limited aliases for a mailbox.
   * @param mailbox - The mailbox to list time-limited aliases for.
   */
  getTimeLimited(mailbox: string): Promise<TimeLimitedAlias[]>;

  /**
   * Endpoint for extending a time-limited alias's expiry, or marking it
   * permanent.
   * @param payload - The edit payload.
   */
  editTimeLimited(payload: TimeLimitedAliasEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for deleting one or more time-limited aliases.
   * @param payload - The deletion payload.
   */
  deleteTimeLimited(payload: TimeLimitedAliasDeleteRequest): Promise<MailcowResponse>;
}

const ALIAS_ENDPOINTS = {
  GET: 'get/alias',
  ADD: 'add/alias',
  EDIT: 'edit/alias',
  DELETE: 'delete/alias',
  ADD_TIME_LIMITED: 'add/time_limited_alias',
  GET_TIME_LIMITED: 'get/time_limited_aliases',
  EDIT_TIME_LIMITED: 'edit/time_limited_alias',
  DELETE_TIME_LIMITED: 'delete/time_limited_alias',
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
    createTimeLimited: (payload: TimeLimitedAliasPostRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, TimeLimitedAliasPostRequest>(
        ALIAS_ENDPOINTS.ADD_TIME_LIMITED,
        payload,
      );
    },
    getTimeLimited(mailbox: string): Promise<TimeLimitedAlias[]> {
      return bind.requestFactory.get<TimeLimitedAlias[]>(`${ALIAS_ENDPOINTS.GET_TIME_LIMITED}/${mailbox}`);
    },
    editTimeLimited: (payload: TimeLimitedAliasEditRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, TimeLimitedAliasEditRequest>(
        ALIAS_ENDPOINTS.EDIT_TIME_LIMITED,
        payload,
      );
    },
    deleteTimeLimited: (payload: TimeLimitedAliasDeleteRequest): Promise<MailcowResponse> => {
      return bind.requestFactory.post<MailcowResponse, TimeLimitedAliasDeleteRequest>(
        ALIAS_ENDPOINTS.DELETE_TIME_LIMITED,
        payload,
      );
    },
  };
}
