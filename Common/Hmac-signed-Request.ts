import { RequestSignParams } from '@dazn/http-hmac/dist/interfaces/sign-params';
import { latestCreds } from '@dazn/http-hmac-vault';
import { signRequest } from '@dazn/http-hmac';
import DAZL from '@dazn/dazl';

type VaultOptions = {
    host: string; // vault host name e.g. this.vault.indazn.com
    namespace: string; // the vault namespace of the service to be called
    path: string; // the path to the secret in vault e.g. http-hmac/dev/data/ar-tpos
    role: string; // the aws iam role name to be used by vault to fetch the secret
  };

// planning to replace http-hmac-sign-request.ts with this.
export class HmacSignedRequest {
  constructor(private vaultOptions: VaultOptions) {}

  async getSignedRequest(requestOptions: RequestSignParams, logger: DAZL) {
    const credsFn = latestCreds(this.vaultOptions);
    const { keyId, secret } = await credsFn();
    // returns { headers, verifyResponse}
    // headers are signed headers using vault secret
    // verifyResponse is a function to verify signed response, returns error if fails or returns void.
    return signRequest({
      keyId,
      secret,
      logger,
      request: requestOptions,
      softMode: true,
    });
  }
}
