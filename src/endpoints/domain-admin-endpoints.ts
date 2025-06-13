import {
  CreateDomainAdminRequest,
  DeleteDomainAdminRequest,
  DomainAdmin,
  EditDomainAdminRequest,
  IssueDomainAdminSsoTokenRequest,
  MailcowResponse,
} from '../types';
import MailcowClient from '../index';

/**
 * Interface for all Domain Admin endpoints related to Mailcow.
 */
export interface DomainAdminEndpoints {
  /**
   * Creates a new Domain Admin user.
   * @param payload - Object containing details to create a new Domain Admin.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  create(payload: CreateDomainAdminRequest): Promise<MailcowResponse>;

  /**
   * Issues a Single Sign-On token for a Domain Admin user.
   * @param payload - Object containing the username for which to issue the SSO token.
   * @returns A promise that resolves to a response containing the issued SSO token.
   */
  issueSsoToken(payload: IssueDomainAdminSsoTokenRequest): Promise<MailcowResponse>;

  /**
   * Edits an existing Domain Admin user.
   * @param payload - Object containing the username and attributes to edit.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  edit(payload: EditDomainAdminRequest): Promise<MailcowResponse>;

  /**
   * Deletes specified Domain Admin users.
   * @param payload - Object containing list of usernames to delete.
   * @returns A promise that resolves to a response indicating success or failure.
   */
  delete(payload: DeleteDomainAdminRequest): Promise<MailcowResponse>;

  /**
   * Retrieves all Domain Admin users.
   * @returns A promise that resolves to an array of `DomainAdmin` objects.
   */
  get(id: 'all'): Promise<DomainAdmin[]>;
}

const DOMAIN_ADMIN_ENDPOINTS = {
  CREATE: 'add/domain-admin',
  ISSUE_SSO_TOKEN: 'add/sso/domain-admin',
  EDIT: 'edit/domain-admin',
  DELETE: 'delete/domain-admin',
  GET_ALL: 'get/domain-admin/all',
};

/**
 * Binder function between the MailcowClient class and the DomainAdminEndpoints.
 * @param bind - The MailcowClient instance to bind.
 * @internal
 */
export function domainAdminEndpoints(bind: MailcowClient): DomainAdminEndpoints {
  return {
    create(payload: CreateDomainAdminRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CreateDomainAdminRequest>(
        DOMAIN_ADMIN_ENDPOINTS.CREATE,
        payload,
      );
    },
    issueSsoToken(payload: IssueDomainAdminSsoTokenRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, IssueDomainAdminSsoTokenRequest>(
        DOMAIN_ADMIN_ENDPOINTS.ISSUE_SSO_TOKEN,
        payload,
      );
    },
    edit(payload: EditDomainAdminRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, EditDomainAdminRequest>(DOMAIN_ADMIN_ENDPOINTS.EDIT, payload);
    },
    delete(payload: DeleteDomainAdminRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(DOMAIN_ADMIN_ENDPOINTS.DELETE, payload.items);
    },
    get(): Promise<DomainAdmin[]> {
      return bind.requestFactory.get<DomainAdmin[]>(DOMAIN_ADMIN_ENDPOINTS.GET_ALL);
    },
  };
}
