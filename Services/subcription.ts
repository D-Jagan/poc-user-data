import { Method } from "axios";
import { HTTPError } from 'got';
import {
    HmacProtectedServiceClient,
    HmacRequestConfig,
    httpResCode,
  } from '../Common/hmac-protected-service-client';
import { HmacSignedRequest } from '../Common/Hmac-signed-Request';
import { HmacProtectedService } from '../Common/Hmac-Protected-Service';
import config from '../config';
import { platoHTTPClient, platoRatePlansHTTPClient } from '../Client/http-client';
import { SubscribeApiResponse, RateplanApiResponse } from "../Common/types";
import { FORBIDDEN, BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { logger } from "../Common/logger";
type VaultOptions = {
    host: string; // vault host name e.g. this.vault.indazn.com
    namespace: string; // the vault namespace of the service to be called
    path: string; // the path to the secret in vault e.g. http-hmac/dev/data/ar-tpos
    role: string; // the aws iam role name to be used by vault to fetch the secret
  };
const VAULT_OPTIONS: VaultOptions = {
    host: config.VAULT_ADDR.replace(/^https?:\/\//, ''),
    namespace: config.PLATO_VAULT_NAMESPACE,
    path: config.VAULT_HTTP_HMAC_MOUNT_PATH_PLATO,
    role: config.PLATO_VAULT_ROLE_HTTP_HMAC,
  };

const hmacSignedRequest = new HmacSignedRequest(VAULT_OPTIONS);
// TODO: use single client, needs tests to be fixed
const hmacProtectedServicePlato = new HmacProtectedService<SubscribeApiResponse>(platoHTTPClient);
  const hmacClient = new HmacProtectedServiceClient<
  SubscribeApiResponse | SubscribeApiResponse[] | RateplanApiResponse[]
  >(errorHandler, logger);
  const hmacProtectedServicePlatoRatePlan = new HmacProtectedService<SubscribeApiResponse>(
    platoRatePlansHTTPClient,
  );

export async function getSubcriptionData(DaznUserId: any) {
    const queryParam = `daznUserId=${DaznUserId}`

    const hmacRequestConfig = getHmacRequestConfig(queryParam,  config.SUBSCRIPTION_V2_SERVICE_URI);

    return hmacClient.getResponseBody(
        hmacSignedRequest,
        hmacProtectedServicePlato,
        hmacRequestConfig,
      ) as Promise<[number, SubscribeApiResponse[]]>;
}

export function getRateplanData(daznUserId: string) {
  const queryParam = `daznUserId=${daznUserId}`;
  const hmacRequestConfig = getHmacRequestConfig(queryParam, config.RATEPLANS_SERVICE_URI);
  return hmacClient.getResponseBody(
    hmacSignedRequest,
    hmacProtectedServicePlatoRatePlan,
    hmacRequestConfig,
  ) as Promise<[number, RateplanApiResponse[]]>;
}

function getHmacRequestConfig(query: string, path: string): HmacRequestConfig {
    const uri = `${path}?${query}`;
    const url = `${config.SUBSCRIPTION_SERVICE_URL}${uri}`;
    return {
      host: config.SUBSCRIPTION_SERVICE_HOSTNAME,
      method: 'GET',
      url: url,
      path,
      queryParam: query,
    };
  }

  function errorHandler(error: HTTPError): [httpResCode, null] {
    const errStatusCode = error.response.statusCode;
    if ([UNAUTHORIZED, FORBIDDEN, BAD_REQUEST].includes(errStatusCode)) {
      HmacProtectedServiceClient.logAuthError(errStatusCode, 'plato', error);
    }
    return [errStatusCode, null];
  }