import {
  DomainDeleteRequest,
  DomainEditRequest,
  DomainPostRequest,
  Domain,
  MailcowResponse
} from '../types';
import MailcowClient from '../index';
import { wrapPromiseToArray } from '../request-factory';

/**
 * Interface for all Domain endpoints.
 */
export interface DomainEndpoints {
  /**
   * Endpoint for getting domains.
   * @param domain - Name of the domain to get.
   */
  get(domain: string): Promise<Domain[]>;

  /**
   * Endpoint for creating domains.
   * @param payload - The creation payload.
   */
  create(payload: DomainPostRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for deleting a domain.
   * @param payload - The deletion payload.
   */
  delete(payload: DomainDeleteRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a domain.
   * @param payload - The edit payload.
   */
  edit(payload: DomainEditRequest): Promise<MailcowResponse>;
}

/**
 * Binder function between the MailcowClient class and the DomainEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function domainEndpoints(bind: MailcowClient): DomainEndpoints {
  return {
    get(domain: string = 'all'): Promise<Domain[]> {
      return wrapPromiseToArray<Domain>(
        bind.requestFactory.get<Domain | Domain[]>(
          `/api/v1/get/domain/${ domain }`
        )
      );
    },
    create(payload: DomainPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/domain',
        payload
      );
    },
    delete(payload: DomainDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/domain',
        payload.domains
      );
    },
    edit(payload: DomainEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/domain',
        payload
      );
    }
  };
}
