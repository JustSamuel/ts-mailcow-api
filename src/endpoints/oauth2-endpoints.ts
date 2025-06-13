import {
  AddOAuthClientRequest,
  DeleteOAuthClientRequest,
  GetOAuthClientRequest,
  MailcowResponse,
  OAuthClient
} from '../types';
import MailcowClient from '../index';


/**
 * Interface for all OAuth2 Client endpoints related to email handling in Mailcow.
 */
export interface OAuth2Endpoints {
  /**
   * Adds a new OAuth client.
   * @param payload - Object containing the redirect URI for the OAuth client.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  add(payload: AddOAuthClientRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified OAuth clients.
   * @param payload - Object containing a list of OAuth client IDs to delete.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  delete(payload: DeleteOAuthClientRequest): Promise<MailcowResponse>;

  /**
   * Retrieves an OAuth client by ID or all clients.
   * @param payload - Object containing the OAuth client ID or 'all' to retrieve all clients.
   * @returns A promise that resolves to an array of `OAuthClient` objects.
   */
  get(payload: GetOAuthClientRequest): Promise<OAuthClient[]>;
}

const OAUTH2_ENDPOINTS = {
  ADD: 'add/oauth2-client',
  DELETE: 'delete/oauth2-client',
  GET: 'get/oauth2-client/',
};

/**
 * Binder function between the MailcowClient class and the OAuth2Endpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function oauth2Endpoints(bind: MailcowClient): OAuth2Endpoints {
  return {
    add(payload: AddOAuthClientRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, AddOAuthClientRequest>(
        OAUTH2_ENDPOINTS.ADD,
        payload
      );
    },
    delete(payload: DeleteOAuthClientRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(
        OAUTH2_ENDPOINTS.DELETE,
        payload.items
      );
    },
    get(payload: GetOAuthClientRequest): Promise<OAuthClient[]> {
      return bind.requestFactory.get<OAuthClient[]>(
        `${OAUTH2_ENDPOINTS.GET}${payload.id}`
      );
    },
  };
}