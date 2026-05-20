import { DeleteQuarantineRequest, EditQuarantineItemRequest, MailcowResponse, QuarantineItem } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all Quarantine endpoints related to email handling in Mailcow.
 */
export interface QuarantineEndpoints {
  /**
   * Deletes emails from the quarantine.
   * @param payload - An array of email IDs to delete from quarantine.
   * @returns A promise that resolves to the Mailcow API response indicating success or failure.
   */
  delete(payload: DeleteQuarantineRequest): Promise<MailcowResponse>;

  /**
   * Acts on quarantined emails: release them to the recipient's inbox
   * or learn them as ham to improve future Rspamd filtering.
   * @param payload - The IDs to act on and the action to take.
   * @returns A promise that resolves to the Mailcow API response indicating success or failure.
   */
  edit(payload: EditQuarantineItemRequest): Promise<MailcowResponse>;

  /**
   * Retrieves all emails currently held in quarantine.
   * @returns A promise that resolves to an array of `QuarantineItem` representing each quarantined email.
   */
  get(): Promise<QuarantineItem[]>;
}

const QUARANTINE_ENDPOINTS = {
  DELETE: 'delete/qitem',
  EDIT: 'edit/qitem',
  GET: 'get/quarantine/all',
};

/**
 * Binder function between the MailcowClient class and the QuarantineEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function quarantineEndpoints(bind: MailcowClient): QuarantineEndpoints {
  return {
    delete(payload: DeleteQuarantineRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, number[]>(QUARANTINE_ENDPOINTS.DELETE, payload.items);
    },
    edit(payload: EditQuarantineItemRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, EditQuarantineItemRequest>(QUARANTINE_ENDPOINTS.EDIT, payload);
    },
    get(): Promise<QuarantineItem[]> {
      return bind.requestFactory.get<QuarantineItem[]>(QUARANTINE_ENDPOINTS.GET);
    },
  };
}
