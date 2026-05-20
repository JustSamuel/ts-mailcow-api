import MailcowClient from '../index';
import { IdentityProviderAttributes, IdentityProviderEditRequest, MailcowResponse } from '../types';

/**
 * Interface for the external Identity Provider endpoint.
 *
 * Mailcow has a single global identity-provider configuration -- there
 * is no add or delete, only edit -- so this group exposes a single
 * method.
 */
export interface IdentityProviderEndpoints {
  /**
   * Configure (or reconfigure) the external Identity Provider used for
   * Mailcow login. Pass the attributes for one of the supported
   * `authsource` values; the wrapper supplies the required
   * `items: ['identity-provider']` envelope.
   *
   * @param attr - The identity-provider attributes to apply.
   */
  edit(attr: IdentityProviderAttributes): Promise<MailcowResponse>;
}

const IDENTITY_PROVIDER_ENDPOINTS = {
  EDIT: 'edit/identity-provider',
};

/**
 * Binder function between the MailcowClient class and the
 * IdentityProviderEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function identityProviderEndpoints(bind: MailcowClient): IdentityProviderEndpoints {
  return {
    edit(attr: IdentityProviderAttributes): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, IdentityProviderEditRequest>(IDENTITY_PROVIDER_ENDPOINTS.EDIT, {
        attr,
        items: ['identity-provider'],
      });
    },
  };
}
