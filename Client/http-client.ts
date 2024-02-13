import got, { Got, OptionsOfJSONResponseBody, Response } from 'got';

import { gotchaLogging } from '@dazn/gotcha-logging';
import { gotchaUserAgent } from '@dazn/gotcha-useragent';
import config from '../config';
import Agent from 'agentkeepalive';
import DAZL from '@dazn/dazl';

export type HTTPResponse<T> = Response<T>;

export class HTTPClient {
  private readonly httpAgent: Agent;
  private readonly httpsAgent: Agent.HttpsAgent;
  private readonly gotClient: Got;

  constructor() {
    /*
      By default:
        keepAlive: true,
        keepAliveMsecs: 1000
        freeSocketTimeout: 4000
        timeout: 8000
        maxSocket: infinity
        maxFreeSockets: 256
        socketActiveTTL: null
     */
    // Target server HTTP keep alive timeouts must always be greater than client
    // timeouts to prevent sending requests to closed sockets.
    this.httpAgent = new Agent();
    this.httpsAgent = new Agent.HttpsAgent();
    this.gotClient = got
      .extend(gotchaUserAgent(config.SERVICE_NAME, config.VERSION, config.APP_ENVIRONMENT))
      .extend({
        timeout: {
          request: config.HTTP_CLIENT_TIMEOUT,
        },
      });
  }
  async doHttpCall<T>(url: string, options: OptionsOfJSONResponseBody): Promise<Response<T>> {
    return this.gotClient(url, {
      agent: {
        http: this.httpAgent,
        https: this.httpsAgent,
      },
      retry: options.retry || 3,
      method: options.method || 'GET',
      json: options.json,
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-correlation-id': '1234',
        ...options.headers,
      },
    });
  }
}

export const geoFencingHTTPClient = new HTTPClient();
export const fteHTTPClient = new HTTPClient();
export const campaignLandingPageHTTPClient = new HTTPClient();
export const campaignGiftCodeHTTPClient = new HTTPClient();
export const campaignDefaultPromoHTTPClient = new HTTPClient();
export const platoHTTPClient = new HTTPClient();
export const platoRatePlansHTTPClient = new HTTPClient();
export const eusHTTPClient = new HTTPClient();
export const eConfHTTPClient = new HTTPClient();
