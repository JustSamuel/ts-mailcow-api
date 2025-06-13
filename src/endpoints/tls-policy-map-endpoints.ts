import { AddTlsPolicyMapRequest, DeleteTlsPolicyMapRequest, MailcowResponse, TlsPolicyMap } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all TLS Policy Map endpoints related to Mailcow.
 */
export interface TlsPolicyMapEndpoints {
  /**
   * Adds a new TLS Policy Map.
   * @param payload - Object containing details for the TLS Policy Map.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  add(payload: AddTlsPolicyMapRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified TLS Policy Maps.
   * @param payload - Object containing a list of TLS Policy Map IDs to delete.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  delete(payload: DeleteTlsPolicyMapRequest): Promise<MailcowResponse>;

  /**
   * Retrieves a TLS Policy Map by ID or all maps.
   * @param id - The TLS policy map ID or 'all' to retrieve all maps.
   * @returns A promise that resolves to an array of `TlsPolicyMap` objects.
   */
  get(id: string): Promise<TlsPolicyMap[]>;
  get(id: 'all'): Promise<TlsPolicyMap[]>;
}

const TLS_POLICY_MAP_ENDPOINTS = {
  ADD: 'add/tls-policy-map',
  DELETE: 'delete/tls-policy-map',
  GET: 'get/tls-policy-map/',
};

/**
 * Binder function between the MailcowClient class and the TlsPolicyMapEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function tlsPolicyMapEndpoints(bind: MailcowClient): TlsPolicyMapEndpoints {
  return {
    add(payload: AddTlsPolicyMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, AddTlsPolicyMapRequest>(TLS_POLICY_MAP_ENDPOINTS.ADD, payload);
    },
    delete(payload: DeleteTlsPolicyMapRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(TLS_POLICY_MAP_ENDPOINTS.DELETE, payload.items);
    },
    get(id: string): Promise<TlsPolicyMap[]> {
      return bind.requestFactory.get<TlsPolicyMap[]>(`${TLS_POLICY_MAP_ENDPOINTS.GET}${id}`);
    },
  };
}
