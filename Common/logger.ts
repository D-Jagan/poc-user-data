import DAZL from '@dazn/dazl';

export const logger = new DAZL ({
    level: 'DEBUG',
    app_name: 'tiered-pricing-offer-service',
    private_name: 'tiered-pricing-offer-service',
    output: undefined,
    http_request: undefined,
    correlation_ids: { 'x-correlation-id': '9c124340-e2a0-4b77-be3a-2ed03480f4a0' },
    library: undefined
  })