import { DeleteQuarantineRequest, MailcowResponse, QuarantineItem } from '../types';
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
   * Retrieves all emails currently held in quarantine.
   * @returns A promise that resolves to an array of `QuarantineItem` representing each quarantined email.
   */
  get(): Promise<QuarantineItem[]>;
}

const QUARANTINE_ENDPOINTS = {
  DELETE: 'delete/qitem',
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
    get(): Promise<QuarantineItem[]> {
      return bind.requestFactory.get<QuarantineItem[]>(QUARANTINE_ENDPOINTS.GET);
    },
  };
}
