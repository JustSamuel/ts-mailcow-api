import axios, { AxiosError, AxiosResponse } from 'axios';
import { MailcowErrorResponse, MailcowException } from './types';
import MailcowClient from './index';

/**
 * Ensures output is an array.
 * @param item
 * @internal
 */
function wrapToArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

/**
 * Function that wraps T | T[] to T[]
 * @internal
 * @param promise - The promise of which the output to wrap.
 */
export function wrapPromiseToArray<T>(promise: Promise<T | T[]>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    promise
      .then((res: T | T[]) => resolve(wrapToArray(res)))
      .catch((err) => reject(err instanceof Error ? err : new Error(String(err))));
  });
}

/**
 * Factory method patterns for creating Axios Requests.
 * @internal
 */
export default class RequestFactory {
  private ctx: MailcowClient;

  constructor(ctx: MailcowClient) {
    this.ctx = ctx;
  }

  /**
   * POST Request Factory
   * @param route - The route to which to send the request.
   * @param payload - The payload to send with the request.
   */
  async post<T, P extends object>(route: string, payload: P): Promise<T> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.ctx.BASE_URL + route, payload, this.ctx.AXIOS_CONFIG)
        // On succes
        .then((res: AxiosResponse<T>) => {
          resolve(res.data);
        })
        // On error
        .catch((e: AxiosError<MailcowErrorResponse>) => {
          const { msg } = e.response.data;
          reject(new MailcowException(msg));
        });
    });
  }

  /**
   * GET Request Factory
   * @param route - The route to which to send the request.
   */
  async get<T>(route: string): Promise<T> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.ctx.BASE_URL + route, this.ctx.AXIOS_CONFIG)
        // On succes
        .then((res: AxiosResponse<T>) => {
          resolve(res.data);
        })
        // On error
        .catch((e: AxiosError<MailcowErrorResponse>) => {
          const { msg } = e.response.data;
          reject(new MailcowException(msg));
        });
    });
  }
}
