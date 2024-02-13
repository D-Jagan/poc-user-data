export type Config = {
    APP_TIMEOUT: string;
    SERVICE_URL: string;
    MEMOIZE_DEFAULT_PROMOTION_MAX_SIZE: number;
    MEMOIZE_DEFAULT_PROMOTION_TTL: number;
  
    //FTE service
    FTE_VAULT_ROLE_HTTP_HMAC: string;
    VAULT_HTTP_HMAC_MOUNT_PATH_FTE: string;
    FTE_VAULT_NAMESPACE: string;
    FTE_SERVICE_HOSTNAME: string;
    FTE_SERVICE_URL: string;
    FTE_ELIGIBILITY_STATUS_URI: string;
  
    // subscription service
    SUBSCRIPTION_SERVICE_HOSTNAME: string;
    SUBSCRIPTION_SERVICE_URL: string;
    SUBSCRIPTION_SERVICE_URI: string;
    SUBSCRIPTION_V2_SERVICE_URI: string;
    RATEPLANS_SERVICE_URI: string;
    PLATO_VAULT_NAMESPACE: string;
    VAULT_HTTP_HMAC_MOUNT_PATH_PLATO: string;
    PLATO_VAULT_ROLE_HTTP_HMAC: string;
  
    // Entitlement service
    ENTITLEMENT_USER_SERVICE_URL: string;
    ENTITLEMENT_USER_SERVICE_HOSTNAME: string;
    EUS_VAULT_NAMESPACE: string;
    VAULT_HTTP_HMAC_MOUNT_PATH_EUS: string;
    EUS_VAULT_ROLE_HTTP_HMAC: string;
  
    // Entitlement config service
    ENTITLEMENT_CONFIG_SERVICE_URL: string;
    ENTITLEMENT_CONFIG_SERVICE_HOSTNAME: string;
    ECONF_VAULT_NAMESPACE: string;
    VAULT_HTTP_HMAC_MOUNT_PATH_ECONF: string;
    ECONF_VAULT_ROLE_HTTP_HMAC: string;
  
    CAMPAIGN_LANDING_PAGE_URL: string;
    CAMPAIGN_GIFT_CODE_URL: string;
    CAMPAIGN_SERVICE_URL: string;
    CAMPAIGN_DEFAULT_PROMOTIONS_URL: string;
    HMAC_DISABLED: boolean;
    VAULT_TTL: number;
    VAULT_ROLE_HTTP_HMAC: string;
    VAULT_NAMESPACE: string;
    VAULT_ADDR: string;
    BASE_ERROR_CODE: string;
    APP_ENVIRONMENT: string;
    SERVICE_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_CONN_POOL_LIMIT: number;
    GEOFENCING_SERVICE_API_KEY: string;
    DB_PASSWORD: string;
    AWS_REGION: string;
    VERSION: string;
    SERVICE_NAME: string;
    GEOFENCING_SERVICE_URL: string;
  
    // PPV enable flag
    PPV_ENABLED: boolean;
    // Retention Offers flag
    RETENTION_OFFERS_ENABLED: boolean;
    HTTP_CLIENT_TIMEOUT: number;
  
    PLATO_V2_ENABLED: boolean;
  };
  
  export default {
    APP_TIMEOUT: process.env.APP_TIMEOUT || '11s',
    VERSION: process.env.GIT_COMMIT || 'NO_GIT_SHA',
    SERVICE_NAME: 'tiered-pricing-offer-service',
    GEOFENCING_SERVICE_URL: `https://${process.env.GEOFENCING_SERVICE_URL}`,
    GEOFENCING_SERVICE_VALIDATE_ENDPOINT: 'validate',
    CAMPAIGN_SERVICE_URL: `http://${process.env.CAMPAIGN_SERVICE_URL}`,
    FTE_SERVICE_HOSTNAME: `${process.env.FTE_SERVICE_URL}`,
    FTE_SERVICE_URL: `https://${process.env.FTE_SERVICE_URL}`,
    HTTP_CLIENT_TIMEOUT: 5000,
  
    //subscription service (plato)
    SUBSCRIPTION_SERVICE_HOSTNAME: `${process.env.SUBSCRIPTION_SERVICE_HOSTNAME}`,
    SUBSCRIPTION_SERVICE_URL: `https://${process.env.SUBSCRIPTION_SERVICE_HOSTNAME}`,
    SUBSCRIPTION_SERVICE_URI: '/v1/subscriptions',
    SUBSCRIPTION_V2_SERVICE_URI: '/v2/subscriptions',
    RATEPLANS_SERVICE_URI: '/v1/rate-plans',
    PLATO_VAULT_NAMESPACE: `${process.env.PLATO_VAULT_NAMESPACE}`,
    PLATO_VAULT_ROLE_HTTP_HMAC: `${process.env.PLATO_VAULT_ROLE_HTTP_HMAC}`,
    VAULT_HTTP_HMAC_MOUNT_PATH_PLATO: `${process.env.VAULT_HTTP_HMAC_MOUNT_PATH_PLATO}`,
    PLATO_V2_ENABLED: process.env.PLATO_V2_ENABLED === 'true' || false,
  
    // entitlement service
    ENTITLEMENT_USER_SERVICE_HOSTNAME: `${process.env.ENTITLEMENT_USER_SERVICE_HOSTNAME}`,
    ENTITLEMENT_USER_SERVICE_URL: `https://${process.env.ENTITLEMENT_USER_SERVICE_HOSTNAME}`,
    EUS_VAULT_NAMESPACE: `${process.env.EUS_VAULT_NAMESPACE}`,
    EUS_VAULT_ROLE_HTTP_HMAC: `${process.env.EUS_VAULT_ROLE_HTTP_HMAC}`,
    VAULT_HTTP_HMAC_MOUNT_PATH_EUS: `${process.env.VAULT_HTTP_HMAC_MOUNT_PATH_EUS}`,
  
    // entitlement config service
    ENTITLEMENT_CONFIG_SERVICE_HOSTNAME: `${process.env.ENTITLEMENT_CONFIG_SERVICE_HOSTNAME}`,
    ENTITLEMENT_CONFIG_SERVICE_URL: `https://${process.env.ENTITLEMENT_CONFIG_SERVICE_HOSTNAME}`,
    ECONF_VAULT_NAMESPACE: `${process.env.ECONF_VAULT_NAMESPACE}`,
    ECONF_VAULT_ROLE_HTTP_HMAC: `${process.env.ECONF_VAULT_ROLE_HTTP_HMAC}`,
    VAULT_HTTP_HMAC_MOUNT_PATH_ECONF: `${process.env.VAULT_HTTP_HMAC_MOUNT_PATH_ECONF}`,
  
    FTE_ELIGIBILITY_STATUS_URI: 'v1/eligibility-status',
    CAMPAIGN_LANDING_PAGE_URL: '/landingpage-promotion',
    CAMPAIGN_GIFT_CODE_URL: '/giftcode-promotion',
    CAMPAIGN_DEFAULT_PROMOTIONS_URL: '/default-promotions',
    COUNTRY_CONFIG_URL: `https://${process.env.COUNTRY_CONFIG_URL}`,
    COUNTRY_CONFIG_REFRESH_RATE: 10,
    TAX_CONFIG_URL: `https://${process.env.TAX_CONFIG_URL}`,
    TAX_CONFIG_REFRESH_RATE: 60,
    GEOFENCING_SERVICE_API_KEY: process.env.GEOFENCING_SERVICE_API_KEY,
    AWS_REGION: process.env.AWS_REGION,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || process.env.ENVIRONMENT || 'dev',
    SERVICE_URL: `https://${process.env.EXTERNAL_URL}`,
    SERVICE_PORT: Number(process.env.SERVICE_PORT) || 8090,
    BASE_ERROR_CODE: 'TPOS',
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_CONN_POOL_LIMIT: Number(process.env.DB_CONN_POOL_LIMIT) || 20,
    NEW_RELIC_APP_NAME: process.env.NEW_RELIC_APP_NAME,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    NEW_RELIC_LOG_LEVEL: process.env.NEW_RELIC_LOG_LEVEL,
    NEW_RELIC_ENABLED: process.env.NEW_RELIC_ENABLED,
    NEW_RELIC_LABELS: process.env.NEW_RELIC_LABELS,
    NEW_RELIC_TRACER_ENABLED: process.env.NEW_RELIC_TRACER_ENABLED,
    NEW_RELIC_SLOW_SQL_ENABLED: process.env.NEW_RELIC_SLOW_SQL_ENABLED,
    NEW_RELIC_DISTRIBUTED_TRACING_ENABLED: process.env.NEW_RELIC_DISTRIBUTED_TRACING_ENABLED,
    VAULT_NAMESPACE: process.env.VAULT_NAMESPACE || 'ar-tiered-pricing-offer-service',
    FTE_VAULT_NAMESPACE: process.env.FTE_VAULT_NAMESPACE,
    VAULT_ADDR: process.env.VAULT_ADDR || 'https://this.vault.dazn-stage.com',
    VAULT_ROLE_HTTP_HMAC: process.env.VAULT_ROLE_HTTP_HMAC || 'ar-tiered-pricing-offer-service-dev',
    FTE_VAULT_ROLE_HTTP_HMAC: process.env.FTE_VAULT_ROLE_HTTP_HMAC,
    VAULT_HTTP_HMAC_MOUNT_PATH_TPP: process.env.VAULT_HTTP_HMAC_MOUNT_PATH_TPP,
    VAULT_HTTP_HMAC_MOUNT_PATH_FTE: process.env.VAULT_HTTP_HMAC_MOUNT_PATH_FTE,
    VAULT_TTL: Number(process.env.VAULT_TTL) || 15 * 60 * 1000, // 15 min
    HMAC_DISABLED: process.env.HMAC_DISABLED === 'true' || false,
    FTE_ENABLED: process.env.FTE_ENABLED === 'true' || false,
    MEMOIZE_DEFAULT_PROMOTION_ENABLED:
      process.env.MEMOIZE_DEFAULT_PROMOTION_ENABLED === 'true' || true,
    MEMOIZE_DEFAULT_PROMOTION_TTL: Number(process.env.MEMOIZE_DEFAULT_PROMOTION_TTL) || 60000,
    MEMOIZE_DEFAULT_PROMOTION_MAX_SIZE: Number(process.env.MEMOIZE_DEFAULT_PROMOTION_MAX_SIZE) || 500,
    PPV_ENABLED: true,
    RETENTION_OFFERS_ENABLED: process.env.RETENTION_OFFERS_ENABLED === 'true',
  } as Config;
  