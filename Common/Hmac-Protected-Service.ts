import { HTTPClient } from '../Client/http-client';
import { OptionsOfJSONResponseBody } from 'got';
import { SignedRequest } from '@dazn/http-hmac';
import { ResponseSignParams } from '@dazn/http-hmac/dist/interfaces/sign-params';

export class HmacProtectedService<T> {
  constructor(private client: HTTPClient) {}

  async getApiResponse(
    url: string,
    verifyResponse: SignedRequest['verifyResponse'],
    clientOptions: OptionsOfJSONResponseBody,
  ) {
    const response = await this.client.doHttpCall(url, clientOptions);
    const { statusCode, body, headers } = response;
    const responseToBeVerified: ResponseSignParams = {
      status: statusCode,
      headers: headers as { [key: string]: string },
      content: JSON.stringify(body),
    };
    verifyResponse({ requiredHeaders: [], response: responseToBeVerified });
    return body as T;
  }
}
