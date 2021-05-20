import MailcowClient from '../index';
import {
  ACMELog,
  ADLog,
  APILog,
  DCLog,
  NFLog,
  PFLog,
  RLLog,
  RSLog,
  SGLog,
  WDLog
} from '../types';

export interface LogEndpoints {
  /**
   * Endpoint for returning ACME Logs.
   * @param count - The number of logs to return.
   */
  acme(count: number): Promise<ACMELog[]>;

  /**
   * Endpoint for returning API Logs.
   * @param count - The number of logs to return.
   */
  api(count: number): Promise<APILog[]>;

  /**
   * Endpoint for returning Autodiscover Logs.
   * @param count - The number of logs to return.
   */
  autodiscover(count: number): Promise<ADLog[]>;

  /**
   * Endpoint for returning dovecot Logs.
   * @param count - The number of logs to return.
   */
  dovecot(count: number): Promise<DCLog[]>;

  /**
   * Endpoint for returning Netfilter Logs.
   * @param count - The number of logs to return.
   */
  netfilter(count: number): Promise<NFLog[]>;

  /**
   * Endpoint for returning Postfix Logs.
   * @param count - The number of logs to return.
   */
  postfix(count: number): Promise<PFLog[]>;

  /**
   * Endpoint for returning Rate limited Logs.
   * @param count - The number of logs to return.
   */
  ratelimited(count: number): Promise<RLLog[]>;

  /**
   * Endpoint for returning Rspamd Logs.
   * @param count - The number of logs to return.
   */
  rspamd(count: number): Promise<RSLog[]>;

  /**
   * Endpoint for returning SOGo Logs.
   * @param count - The number of logs to return.
   */
  sogo(count: number): Promise<SGLog[]>;

  /**
   * Endpoint for returning Watchdog Logs.
   * @param count - The number of logs to return.
   */
  watchdog(count: number): Promise<WDLog[]>;
}

export function logEndpoints(bind: MailcowClient): LogEndpoints {
  return {
    acme(count: number): Promise<ACMELog[]> {
      return bind.requestFactory.get<ACMELog[]>(
        `/api/v1/get/logs/acme/${count}`
      );
    },
    api(count: number): Promise<APILog[]> {
      return bind.requestFactory.get<APILog[]>(
        `/api/v1/get/logs/api/${count}`
      );
    },
    autodiscover(count: number): Promise<ADLog[]> {
      return bind.requestFactory.get<ADLog[]>(
        `/api/v1/get/logs/autodiscover/${count}`
      );
    },
    dovecot(count: number): Promise<DCLog[]> {
      return bind.requestFactory.get<DCLog[]>(
        `/api/v1/get/logs/dovecot/${count}`
      );
    },
    netfilter(count: number): Promise<NFLog[]> {
      return bind.requestFactory.get<NFLog[]>(
        `/api/v1/get/logs/netfilter/${count}`
      );
    },
    postfix(count: number): Promise<PFLog[]> {
      return bind.requestFactory.get<PFLog[]>(
        `/api/v1/get/logs/postfix/${count}`
      );
    },
    ratelimited(count: number): Promise<RLLog[]> {
      return bind.requestFactory.get<RLLog[]>(
        `/api/v1/get/logs/ratelimited/${count}`
      );
    },
    rspamd(count: number): Promise<RSLog[]> {
      return bind.requestFactory.get<RSLog[]>(
        `/api/v1/get/logs/rspamd-history/${count}`
      );
    },
    sogo(count: number): Promise<SGLog[]> {
      return bind.requestFactory.get<SGLog[]>(
        `/api/v1/get/logs/sogo/${count}`
      );
    },
    watchdog(count: number): Promise<WDLog[]> {
      return bind.requestFactory.get<WDLog[]>(
        `/api/v1/get/logs/watchdog/${count}`
      );
    }
  };
}
