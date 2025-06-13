import { StatusContainers, StatusVersion, StatusVmail } from '../types';
import MailcowClient from '../client';

export interface StatusEndpoints {
  /**
   * Endpoint for getting the container status.
   */
  container(): Promise<StatusContainers>;

  /**
   * Endpoint for getting the vmail status.
   */
  vmail(): Promise<StatusVmail>;

  /**
   * Endpoint for getting the version status.
   */
  version(): Promise<StatusVersion>;
}

const STATUS_ENDPOINTS = {
  CONTAINER: 'get/status/containers',
  VMAIL: 'get/status/vmail',
  VERSION: 'get/status/version',
};

export function statusEndpoints(bind: MailcowClient): StatusEndpoints {
  return {
    container(): Promise<StatusContainers> {
      return bind.requestFactory.get<StatusContainers>(STATUS_ENDPOINTS.CONTAINER);
    },
    vmail(): Promise<StatusVmail> {
      return bind.requestFactory.get<StatusVmail>(STATUS_ENDPOINTS.VMAIL);
    },
    version(): Promise<StatusVersion> {
      return bind.requestFactory.get<StatusVersion>(STATUS_ENDPOINTS.VERSION);
    },
  };
}
