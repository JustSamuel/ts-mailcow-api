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

/**
 * Binder function between the MailcowClient class and the Fail2BanEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function fail2BanEndpoints(bind: MailcowClient): Fail2BanEndpoints {
  return {
    edit(payload: Fail2BanEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, Fail2BanEditRequest>('/api/v1/edit/fail2ban', payload);
    },
    get(): Promise<Fail2BanResponse> {
      return bind.requestFactory.get<Fail2BanResponse>('/api/v1/get/fail2ban');
    },
  };
}
