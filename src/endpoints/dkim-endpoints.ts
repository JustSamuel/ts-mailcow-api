import { CreateDkimRequest, DeleteDkimRequest, DkimEntry, DuplicateDkimRequest, MailcowResponse } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all DKIM endpoints related to Mailcow.
 */
export interface DkimEndpoints {
  /**
   * Generates new DKIM keys for specified domains.
   * @param payload - Object containing details for the DKIM key generation.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  create(payload: CreateDkimRequest): Promise<MailcowResponse>;

  /**
   * Duplicates a DKIM key from one domain to another.
   * @param payload - Object containing source and destination domains for the DKIM key.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  duplicate(payload: DuplicateDkimRequest): Promise<MailcowResponse>;

  /**
   * Deletes DKIM keys for specified domains.
   * @param payload - Object containing a list of domains to delete DKIM keys for.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  delete(payload: DeleteDkimRequest): Promise<MailcowResponse>;

  /**
   * Retrieves the DKIM public key for a specific domain.
   * @param domain - The domain to retrieve the DKIM key for.
   * @returns A promise that resolves to a `DkimEntry` object.
   */
  get(domain: string): Promise<DkimEntry>;
}

const DKIM_ENDPOINTS = {
  CREATE: 'add/dkim',
  DUPLICATE: 'add/dkim_duplicate',
  DELETE: 'delete/dkim',
  GET: 'get/dkim/',
};

/**
 * Binder function between the MailcowClient class and the DkimEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function dkimEndpoints(bind: MailcowClient): DkimEndpoints {
  return {
    create(payload: CreateDkimRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CreateDkimRequest>(DKIM_ENDPOINTS.CREATE, payload);
    },
    duplicate(payload: DuplicateDkimRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DuplicateDkimRequest>(DKIM_ENDPOINTS.DUPLICATE, payload);
    },
    delete(payload: DeleteDkimRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(DKIM_ENDPOINTS.DELETE, payload.items);
    },
    get(domain: string): Promise<DkimEntry> {
      return bind.requestFactory.get<DkimEntry>(`${DKIM_ENDPOINTS.GET}${domain}`);
    },
  };
}
