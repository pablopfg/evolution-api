import { IntegrationDto } from '@api/integrations/integration.dto';
import { WAPresence } from 'baileys';

export class InstanceDto extends IntegrationDto {
  instanceName: string;
  instanceId?: string;
  qrcode?: boolean;
  businessId?: string;
  number?: string;
  integration?: string;
  token?: string;
  status?: string;
  ownerJid?: string;
  profileName?: string;
  profilePicUrl?: string;
  // settings
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  readStatus?: boolean;
  syncFullHistory?: boolean;
  wavoipToken?: string;
  // proxy
  proxyHost?: string;
  proxyPort?: string;
  proxyProtocol?: string;
  proxyUsername?: string;
  proxyPassword?: string;
}

export class SetPresenceDto {
  presence: WAPresence;
}
