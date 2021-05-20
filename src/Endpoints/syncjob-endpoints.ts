import MailcowClient from '../index';
import { MailcowResponse, Syncjob, SyncjobDeleteRequest, SyncjobPostRequest, SyncjobUpdateRequest } from '../types';

export interface SyncjobEndpoints {
  /**
   * Endpoint for creating sync jobs.
   * @param payload - The creation payload.
   */
  create(payload: SyncjobPostRequest): Promise<MailcowResponse>

  /**
   * Endpoint for editing sync jobs.
   * @param payload - The edit payload.
   */
  edit(payload: SyncjobUpdateRequest): Promise<MailcowResponse>

  /**
   * Endpoint for deleting sync jobs
   * @param payload - The deletion payload.
   */
  delete(payload: SyncjobDeleteRequest): Promise<MailcowResponse>

  /**
   * Endpoint for getting all sync jobs.
   */
  getAll(): Promise<Syncjob[]>
}

export function syncjobEndpoints(bind: MailcowClient): SyncjobEndpoints {
  return {
    getAll(): Promise<Syncjob[]> {
      return bind.requestFactory.get<Syncjob[]>(
        '/api/v1/get/syncjobs/all/no_log'
      );
    },
    create(payload: SyncjobPostRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/add/syncjob',
        payload
      );
    },
    edit(payload: SyncjobUpdateRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/edit/syncjob',
        payload
      );
    },
    delete(payload: SyncjobDeleteRequest): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse>(
        '/api/v1/delete/syncjob',
        payload.items
      );
    }
  };
}
