import MailcowClient from '../index';
import { ACMELog, ADLog, APILog, DCLog, NFLog, PFLog, RLLog, RSLog, SGLog, WDLog } from '../types';

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

const LOG_ENDPOINTS = {
  ACME: 'get/logs/acme',
  API: 'get/logs/api',
  AUTODISCOVER: 'get/logs/autodiscover',
  DOVECOT: 'get/logs/dovecot',
  NETFILTER: 'get/logs/netfilter',
  POSTFIX: 'get/logs/postfix',
  RATELIMITED: 'get/logs/ratelimited',
  RSPAMD: 'get/logs/rspamd-history',
  SOGO: 'get/logs/sogo',
  WATCHDOG: 'get/logs/watchdog',
};

export function logEndpoints(bind: MailcowClient): LogEndpoints {
  return {
    acme(count: number): Promise<ACMELog[]> {
      return bind.requestFactory.get<ACMELog[]>(LOG_ENDPOINTS.ACME + `/${count}`);
    },
    api(count: number): Promise<APILog[]> {
      return bind.requestFactory.get<APILog[]>(LOG_ENDPOINTS.API + `/${count}`);
    },
    autodiscover(count: number): Promise<ADLog[]> {
      return bind.requestFactory.get<ADLog[]>(LOG_ENDPOINTS.AUTODISCOVER + `/${count}`);
    },
    dovecot(count: number): Promise<DCLog[]> {
      return bind.requestFactory.get<DCLog[]>(LOG_ENDPOINTS.DOVECOT + `/${count}`);
    },
    netfilter(count: number): Promise<NFLog[]> {
      return bind.requestFactory.get<NFLog[]>(LOG_ENDPOINTS.NETFILTER + `/${count}`);
    },
    postfix(count: number): Promise<PFLog[]> {
      return bind.requestFactory.get<PFLog[]>(LOG_ENDPOINTS.POSTFIX + `/${count}`);
    },
    ratelimited(count: number): Promise<RLLog[]> {
      return bind.requestFactory.get<RLLog[]>(LOG_ENDPOINTS.RATELIMITED + `/${count}`);
    },
    rspamd(count: number): Promise<RSLog[]> {
      return bind.requestFactory.get<RSLog[]>(LOG_ENDPOINTS.RSPAMD + `/${count}`);
    },
    sogo(count: number): Promise<SGLog[]> {
      return bind.requestFactory.get<SGLog[]>(LOG_ENDPOINTS.SOGO + `/${count}`);
    },
    watchdog(count: number): Promise<WDLog[]> {
      return bind.requestFactory.get<WDLog[]>(LOG_ENDPOINTS.WATCHDOG + `/${count}`);
    },
  };
}
