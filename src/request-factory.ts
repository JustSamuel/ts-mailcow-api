import axios from 'axios';
import { BaseResponse, MailcowException, MailcowResponse } from './types';
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

function isErrorType(type: string | undefined): boolean {
  return type === 'danger' || type === 'error';
}

/**
 * Checks if a Mailcow API response indicates an error.
 * Throws a MailcowException if a definite error is detected.
 */
function checkMailcowResponse(res: MailcowResponse | BaseResponse): void {
  // Accepts either a single object or an array
  const arr = Array.isArray(res) ? res : [res];
  for (const item of arr) {
    if (isErrorType(item.type)) {
      throw new MailcowException(Array.isArray(item.msg) ? item.msg.join(', ') : item.msg);
    }
  }
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
    try {
      const res = await axios.post<T>(this.ctx.BASE_URL + route, payload, this.ctx.AXIOS_CONFIG);
      // Only throws if response has danger or error type
      checkMailcowResponse(res.data as unknown as MailcowResponse);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data) {
        // Check if the response *itself* is an error type
        checkMailcowResponse(e.response.data as unknown as MailcowResponse);
        // If no definite error, throw generic
        throw new MailcowException('Unknown Mailcow error');
      }
      throw e;
    }
  }

  /**
   * GET Request Factory
   * @param route - The route to which to send the request.
   */
  async get<T>(route: string): Promise<T> {
    try {
      const res = await axios.get<T>(this.ctx.BASE_URL + route, this.ctx.AXIOS_CONFIG);
      checkMailcowResponse(res.data as unknown as MailcowResponse);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data) {
        checkMailcowResponse(e.response.data as unknown as MailcowResponse);
        throw new MailcowException('Unknown Mailcow error');
      }
      throw e;
    }
  }
}
