import {
  SpamPolicyDeleteRequest,
  SpamPolicyPostRequest,
  MailcowResponse,
  SpamPolicyGetRequest,
  SpamPolicy
} from '../types';
import MailcowClient from '../index';

/**
 * Interface for all antispam policies.
 */
export interface AntiSpamEndpoints {
  /**
   * Endpoint for getting antispam policies.
   * @param payload - The get payload.
   */
  get(payload: SpamPolicyGetRequest): Promise<SpamPolicy[]>

  /**
   * Endpoint for creating antispam policies.
   * @param payload - The creation payload.
   */
  create(payload: SpamPolicyPostRequest): Promise<MailcowResponse>

  /**
   * Endpoint for deleting antispam policies.
   * @param payload - The deletion payload.
   */
  delete(payload: SpamPolicyDeleteRequest): Promise<MailcowResponse>
}


/**
 * Binder function between the MailcowClient class and the AntiSpamEndpoints
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function antiSpamEndpoints(bind: MailcowClient): AntiSpamEndpoints {
  return {
    create(payload: SpamPolicyPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/domain-policy',
        payload,
      );
    },
    delete(payload: SpamPolicyDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/domain-policy',
        payload.prefid,
      );
    },
    get(payload: SpamPolicyGetRequest): Promise<SpamPolicy[]> {
      return bind.requestFactory.get<SpamPolicy[]>(
        `/api/v1/get/policy_${ payload.type }_domain/${ payload.domain }`,
      );
    }
  };
}
