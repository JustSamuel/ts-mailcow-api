import {
  DomainDeleteRequest,
  DomainEditRequest,
  DomainFooterEditRequest,
  DomainPostRequest,
  DomainTagDeleteRequest,
  Domain,
  MailcowResponse,
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

  /**
   * Endpoint for removing one or more tags from a domain.
   * @param domain - The domain to remove tags from.
   * @param payload - The tags to remove.
   */
  deleteTag(domain: string, payload: DomainTagDeleteRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for setting the domain-wide mail footer template.
   * @param payload - The edit payload.
   */
  editFooter(payload: DomainFooterEditRequest): Promise<MailcowResponse>;
}

const DOMAIN_ENDPOINTS = {
  GET: 'get/domain',
  ADD: 'add/domain',
  DELETE: 'delete/domain',
  DELETE_TAG: 'delete/domain/tag',
  EDIT: 'edit/domain',
  EDIT_FOOTER: 'edit/domain/footer',
};

/**
 * Binder function between the MailcowClient class and the DomainEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function domainEndpoints(bind: MailcowClient): DomainEndpoints {
  return {
    get(domain: string = 'all'): Promise<Domain[]> {
      return wrapPromiseToArray<Domain>(
        bind.requestFactory.get<Domain | Domain[]>(DOMAIN_ENDPOINTS.GET + `/${domain}`),
      );
    },
    create(payload: DomainPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DomainPostRequest>(DOMAIN_ENDPOINTS.ADD, payload);
    },
    delete(payload: DomainDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(DOMAIN_ENDPOINTS.DELETE, payload.domains);
    },
    edit(payload: DomainEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DomainEditRequest>(DOMAIN_ENDPOINTS.EDIT, payload);
    },
    deleteTag(domain: string, payload: DomainTagDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DomainTagDeleteRequest>(
        DOMAIN_ENDPOINTS.DELETE_TAG + `/${domain}`,
        payload,
      );
    },
    editFooter(payload: DomainFooterEditRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, DomainFooterEditRequest>(DOMAIN_ENDPOINTS.EDIT_FOOTER, payload);
    },
  };
}
