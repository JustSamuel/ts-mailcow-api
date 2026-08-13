import MailcowClient from '../index';
import { CorsAttributes, CorsEditRequest, MailcowResponse } from '../types';

/**
 * Interface for the API's Cross-Origin Resource Sharing (CORS) endpoint.
 *
 * CORS is a single global API setting, not tied to any resource -- there
 * is no add or delete, only edit -- so this group exposes a single
 * method.
 */
export interface CorsEndpoints {
  /**
   * Configure the API's CORS settings.
   * @param attr - The CORS attributes to apply.
   */
  edit(attr: CorsAttributes): Promise<MailcowResponse>;
}

const CORS_ENDPOINTS = {
  EDIT: 'edit/cors',
};

/**
 * Binder function between the MailcowClient class and the CorsEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function corsEndpoints(bind: MailcowClient): CorsEndpoints {
  return {
    edit(attr: CorsAttributes): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CorsEditRequest>(CORS_ENDPOINTS.EDIT, { attr });
    },
  };
}
