import MailcowClient from '../index';
import { ForwardingCreateRequest, ForwardingDeleteRequest, ForwardingHost, MailcowResponse } from '../types';

/**
 * Interface for all Forwarding Hosts endpoints.
 */
export interface ForwardingEndpoints {
  /**
   * Endpoint for deleting forwarding host.
   * @param payload - The deletion payload
   */
  delete(payload: ForwardingDeleteRequest): Promise<MailcowResponse>

  /**
   * Endpoint for creating forwarding host.
   * @param payload - The creation payload
   */
  create(payload: ForwardingCreateRequest): Promise<MailcowResponse>

  /**
   * Endpoint for getting all forwarding host.
   */
  getAll(): Promise<ForwardingHost[]>
}

/**
 * Binder function between the MailcowClient class and the ForwardingEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function forwardingEndpoints(bind: MailcowClient): ForwardingEndpoints {
  return {
    delete(payload: ForwardingDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/fwdhost',
        payload.items
      );
    },
    create(payload: ForwardingCreateRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/fwdhost',
        payload
      );
    },
    getAll(): Promise<ForwardingHost[]> {
      return bind.requestFactory.get<ForwardingHost[]>(
        '/api/v1/get/fwdhost/all'
      );
    }
  };
}
