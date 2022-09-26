import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

export const getHeaders = (config: ConfigService) => {
  return {
    apikey: config.get('apikey'),
    Accept: config.get('Accept'),
    'Content-Type': config.get('ContentType'),
    'Idempotency-Key': uuid(),
  };
};