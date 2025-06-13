import { AddAppPasswordRequest, AppPassword, DeleteAppPasswordRequest, MailcowResponse } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all App Password endpoints related to email handling in Mailcow.
 */
export interface AppPasswordEndpoints {
  /**
   * Adds a new app password.
   * @param payload - Object containing the app password details.
   */
  add(payload: AddAppPasswordRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified app passwords.
   * @param payload - Object containing a list of app password IDs to delete.
   */
  delete(payload: DeleteAppPasswordRequest): Promise<MailcowResponse>;

  /**
   * Retrieves app passwords for a specific mailbox.
   * @param mailbox - The mailbox for which to retrieve app passwords.
   * @returns A promise that resolves to an array of `AppPassword` objects.
   */
  get(mailbox: string): Promise<AppPassword[]>;
}

const APP_PASSWORD_ENDPOINTS = {
  ADD: 'add/app-passwd',
  DELETE: 'delete/app-passwd',
  GET: 'get/app-passwd/all/',
};

/**
 * Binder function between the MailcowClient class and the AppPasswordEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function appPasswordEndpoints(bind: MailcowClient): AppPasswordEndpoints {
  return {
    add(payload: AddAppPasswordRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, AddAppPasswordRequest>(APP_PASSWORD_ENDPOINTS.ADD, payload);
    },
    delete(payload: DeleteAppPasswordRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DeleteAppPasswordRequest>(
        APP_PASSWORD_ENDPOINTS.DELETE,
        payload,
      );
    },
    get(mailbox: string): Promise<AppPassword[]> {
      return bind.requestFactory.get<AppPassword[]>(`${APP_PASSWORD_ENDPOINTS.GET}${mailbox}`);
    },
  };
}
