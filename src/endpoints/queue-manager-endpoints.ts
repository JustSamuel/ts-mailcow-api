import { MailcowResponse, QueueItem } from '../types';
import MailcowClient from '../index';

/**
 * Interface for all Queue Manager endpoints.
 */
export interface QueueManagerEndpoints {
  /**
   * Endpoint for deleting the mail queue.
   * @param action - The action to perform, should be "super_delete" to delete the mail queue.
   */
  delete(action: 'super_delete'): Promise<MailcowResponse>;

  /**
   * Endpoint for getting the current mail queue.
   */
  get(): Promise<QueueItem[]>;

  /**
   * Endpoint for flushing the mail queue.
   * @param action - The action to perform, should be "flush" to flush the mail queue.
   */
  flush(action: 'flush'): Promise<MailcowResponse>;
}

const QUEUE_MANAGER_ENDPOINTS = {
  DELETE: 'delete/mailq',
  GET: 'get/mailq/all',
  FLUSH: 'edit/mailq',
};

/**
 * Binder function between the MailcowClient class and the QueueManagerEndpoints.
 * @param bind - The MailcowClient to bind.
 * @internal
 */
export function queueManagerEndpoints(bind: MailcowClient): QueueManagerEndpoints {
  return {
    delete(action: 'super_delete'): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, { action: 'super_delete' }>(QUEUE_MANAGER_ENDPOINTS.DELETE, {
        action,
      });
    },
    get(): Promise<QueueItem[]> {
      return bind.requestFactory.get<QueueItem[]>(QUEUE_MANAGER_ENDPOINTS.GET);
    },
    flush(action: 'flush'): Promise<MailcowResponse> {
      return bind.requestFactory.post<MailcowResponse, { action: 'flush' }>(QUEUE_MANAGER_ENDPOINTS.FLUSH, { action });
    },
  };
}
