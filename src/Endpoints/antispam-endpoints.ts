import {
  SpamPolicyDeleteRequest,
  SpamPolicyPostRequest,
  MailcowResponse,
  SpamPolicyGetRequest,
  SpamPolicyResponse
} from '../types';
import MailcowClient from '../index';

export default function AntiSpamEndpoints(bind: MailcowClient) {
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
    get(payload: SpamPolicyGetRequest): Promise<SpamPolicyResponse[]> {
      return bind.requestFactory.get<SpamPolicyResponse[]>(
        `/api/v1/get/policy_${ payload.type }_domain/${ payload.domain }`,
      );
    }
  };
}
