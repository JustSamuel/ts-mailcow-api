import { MailcowResponse, Fail2BanEditRequest, Fail2BanResponse } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all Fail2Ban endpoints.
 */
export interface Fail2BanEndpoints {
  /**
   * Endpoint for editing Fail2Ban settings.
   * @param payload - The edit payload.
   */
  edit(payload: Fail2BanEditRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for getting Fail2Ban settings.
   */
  get(): Promise<Fail2BanResponse>;
}

const FAIL2BAN_ENDPOINTS = {
  EDIT: 'edit/fail2ban',
  GET: 'get/fail2ban',
};

/**
 * Binder function between the MailcowClient class and the Fail2BanEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function fail2BanEndpoints(bind: MailcowClient): Fail2BanEndpoints {
  return {
    edit(payload: Fail2BanEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, Fail2BanEditRequest>(FAIL2BAN_ENDPOINTS.EDIT, payload);
    },
    get(): Promise<Fail2BanResponse> {
      return bind.requestFactory.get<Fail2BanResponse>(FAIL2BAN_ENDPOINTS.GET);
    },
  };
}
