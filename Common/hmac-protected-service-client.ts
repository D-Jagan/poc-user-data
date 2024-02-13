import { HmacSignedRequest } from './Hmac-signed-Request';
import { HmacProtectedService } from './Hmac-Protected-Service';
import { HTTPError, Method, OptionsOfJSONResponseBody } from 'got';
import { RequestSignParams } from '@dazn/http-hmac/dist/interfaces';
import DAZL from '@dazn/dazl';
import createError from 'http-errors';
import { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST } from 'http-status-codes';


const DEFAULT_ERROR_CODE = 10000;
export type ErrorResponse = {
    'odata.error': { code: number; message: { lang: string; value: string | string[] } };
};
export const createErrorResponse = (
    message: string | string[],
    errorCode?: number,
  ): ErrorResponse => ({
    'odata.error': {
      code: errorCode ? errorCode : DEFAULT_ERROR_CODE,
      message: {
        lang: 'en-US',
        value: message,
      },
    },
  });
export const ERROR_INTERNAL_SERVER_RESPONSE = createErrorResponse('Unexpected error occurred');

export interface HmacRequestConfig {
  host: string; // e.g. api.example.com, localhost:3000 (without http)
  url: string; // e.g. https://api.example.com, http://localhost:3000
  path: string; // request path e.g. /v1/users/12345/something
  method: Method; // e.g. 'GET' | 'POST'
  queryParam?: string; // e.g. 'foo=bar'
  headers?: { [key: string]: string }; // headers required to be hmac signed
  body?: { [key: string]: string | number | undefined }; // request body
}


export type httpResCode = number;

// a tuple that sends error code if any, or response object, allows handling different error codes differently
export type serviceRes<T> = [httpResCode, T | null];

export type HmacReqErrorHandlerFunc<T> = (error: HTTPError) => serviceRes<T>;

export class HmacProtectedServiceClient<T> {
  constructor(private errFunc: HmacReqErrorHandlerFunc<T>, private logger: DAZL) {}

  async getResponseBody(
    hmacSignedRequst: HmacSignedRequest,
    hmacProtectedService: HmacProtectedService<T>,
    hmacRequestConfig: HmacRequestConfig,
  ): Promise<serviceRes<T>> {
    try {

      const { headers, verifyResponse } = await hmacSignedRequst.getSignedRequest(
        this.getHmacReqParam(hmacRequestConfig),
        this.logger,
      );
      const httpOptions: OptionsOfJSONResponseBody = {
        headers: {
          ...headers,
          'x-correlation-id': '1234',
        },
        method: hmacRequestConfig.method,
        json: hmacRequestConfig.body,
      };
      
      const result = await hmacProtectedService.getApiResponse(
        hmacRequestConfig.url,
        verifyResponse,
        httpOptions,
      );
      return [OK, result];
    } catch (error) {
        console.log(
          `Unexpected error occurred while making hmac request:  ${hmacRequestConfig.method} ${hmacRequestConfig.host}/${hmacRequestConfig.url}`,
          error,
        );
        throw createError(INTERNAL_SERVER_ERROR, { payload: ERROR_INTERNAL_SERVER_RESPONSE });
      }
  }

  private getHmacReqParam(hmacRequestConfig: HmacRequestConfig): RequestSignParams {
    const { host, path, method, queryParam, headers, body } = hmacRequestConfig;
    return {
      method,
      host,
      path,
      query: queryParam ? queryParam : '',
      headers: headers ? headers : {},
      content: body ? JSON.stringify(body) : '',
    };
  }

  static logAuthError(errStatusCode: number, serviceName: string, error: HTTPError) {
    switch (errStatusCode) {
      case UNAUTHORIZED:
        console.log(`HMAC Auth failed for a request to ${serviceName} service`, error);
        break;
      case FORBIDDEN:
       console.log(`Incorrect vault mount path for a request to ${serviceName} service`, error);
        break;
      case BAD_REQUEST:
        console.log(`Bad request data for a request to ${serviceName} service`, error);
        break;
    }
  }
}
