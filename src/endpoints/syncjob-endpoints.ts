import MailcowClient from '../index';
import { MailcowResponse, Syncjob, SyncjobDeleteRequest, SyncjobPostRequest, SyncjobUpdateRequest } from '../types';

export interface SyncjobEndpoints {
  /**
   * Endpoint for creating sync jobs.
   * @param payload - The creation payload.
   */
  create(payload: SyncjobPostRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for editing sync jobs.
   * @param payload - The edit payload.
   */
  edit(payload: SyncjobUpdateRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for deleting sync jobs
   * @param payload - The deletion payload.
   */
  delete(payload: SyncjobDeleteRequest): Promise<MailcowResponse>;

  /**
   * Endpoint for getting all sync jobs.
   */
  getAll(): Promise<Syncjob[]>;
}

const SYNCJOB_ENDPOINTS = {
  GET_ALL: 'get/syncjobs/all/no_log',
  CREATE: 'add/syncjob',
  EDIT: 'edit/syncjob',
  DELETE: 'delete/syncjob',
};

export function syncjobEndpoints(bind: MailcowClient): SyncjobEndpoints {
  return {
    getAll(): Promise<Syncjob[]> {
      return bind.requestFactory.get<Syncjob[]>(SYNCJOB_ENDPOINTS.GET_ALL);
    },
    create(payload: SyncjobPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, SyncjobPostRequest>(SYNCJOB_ENDPOINTS.CREATE, payload);
    },
    edit(payload: SyncjobUpdateRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, SyncjobUpdateRequest>(SYNCJOB_ENDPOINTS.EDIT, payload);
    },
    delete(payload: SyncjobDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, number[]>(SYNCJOB_ENDPOINTS.DELETE, payload.items);
    },
  };
}
