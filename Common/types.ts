export type VaultOptions = {
    host: string; // vault host name e.g. this.vault.indazn.com
    namespace: string; // the vault namespace of the service to be called
    path: string; // the path to the secret in vault e.g. http-hmac/dev/data/ar-tpos
    role: string; // the aws iam role name to be used by vault to fetch the secret
  };

  export type StringOrNull = string | null;
  export type StringOrUndef = string | undefined;
  export enum PromoContext {
    CancellationFlow = 'CancellationFlow',
    InAppPopUp = 'InAppPopUp',
    CsAgent = 'CsAgent',
    CRM = 'CRM',
  }
  export interface SubscribeApiResponse {
    name: string; //subscription name e.g. A-S2874be369f77869e4f819354be2671f6
    memberSince: string; //date e.g. 2017-01-16 08:13:48.000000
    daznId: string; //user's dazn id
    productGroup?: 'NFL' | 'DAZN' | ''; //empy for DAZN
    statusDetails: {
      status: string; // status of the subscription (different from user status) Active|Paused|Cancelled|Unidentified
      startedAt: string; // the date when the subscription started
      upcomingStatus?: {
        status: string; // one of Active|Paused|Cancelled
      }[];
    };
    billToContact: {
      country: string; // billing country full name e.g. "United States"
      countryISOCode: string; // ISO code e.g. 'US'
      state: string | null; // billing state e.g. Tennessee
    };
    paymentMethod: {
      paymentGroup: string; // TPP, Direct, GiftCode, PAC
      method: string; // one of BankTransfer | CreditCard | PayPal | PayNow | ApplePay | GooglePay | GiftCode | Apple | Google |  Roku | Amazon | DCB_Boku | PAC
    };
    endDate?: string | null; // Subscription end date
    accountCurrency?: string | null; // currency that user bought the subscription
    sourceSystem?: string | null;
  }

  export enum ProductGroups {
    Dazn = 'DAZN',
    Nfl = 'NFL',
    Default = '',
    All = 'all',
    LigaSegunda = 'LigaSegunda',
    FIBA = 'FIBA',
  }

  export interface RateplanApiResponse {
    id: string; // subscription rateplan id. refers to user's subscription specific rateplan id. e.g. 8ad08c0f7ba10ec0017bbfa50cec6cf0
    productRatePlanId: string; // product rateplan id e.g. refers to the product rateplan Id purchased by the user. e.g. 7ad08c0f7ba10ec0017bbfa50cec6cf0
    name: string; // rateplan name
    billingPeriod: string; // Month | Annual
    offerType: string; // HardOffer | FreeTrial
    subscriptionName: string; // subscription name e.g. A-S2874be369f77869e4f819354be2671f6
    createdDate: string; // "2018-05-23T12:31:58.000Z"
    ppv?: {
      entitlementSetId: string; // entitlement set id e.g. tom_vs_jerry
      ppvType: string; // bundle | regular
    };
    tier?: {
      id: string; // entitlement set id e.g. gold_dach
      name: string;
    };
    scheduled: boolean;
    effectiveStartDate?: string;
    effectiveEndDate?: StringOrNull;
    productType?: StringOrNull;
    productGroup?: ProductGroups;
    context?: PromoContext;
  }
  