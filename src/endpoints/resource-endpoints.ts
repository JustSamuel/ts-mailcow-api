import { CreateResourceRequest, DeleteResourceRequest, MailcowResponse, Resource } from '../types';
import MailcowClient from '../client';

export interface ResourceEndpoints {
  /**
   * Endpoint for creating a resource.
   * @param payload
   */
  create(payload: CreateResourceRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing a resource.
   * @param payload
   */
  delete(payload: DeleteResourceRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for getting all resources.
   */
  get(): Promise<Resource[]>;
}

const RESOURCE_ENDPOINTS = {
  CREATE: 'add/resource',
  DELETE: 'delete/resource',
  GET: 'get/resource/all',
};

export function resourceEndpoints(bind: MailcowClient): ResourceEndpoints {
  return {
    create(payload: CreateResourceRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, CreateResourceRequest>(RESOURCE_ENDPOINTS.CREATE, payload);
    },
    delete(payload: DeleteResourceRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, string[]>(RESOURCE_ENDPOINTS.DELETE, payload.names);
    },
    get(): Promise<Resource[]> {
      return bind.requestFactory.get<Resource[]>(RESOURCE_ENDPOINTS.GET);
    },
  };
}
