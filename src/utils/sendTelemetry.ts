import { createSafeAxios } from '@utils/safeAxios';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export interface TelemetryData {
  route: string;
  apiVersion: string;
  timestamp: Date;
}

export const sendTelemetry = async (route: string): Promise<void> => {
  const enabled = process.env.TELEMETRY_ENABLED === 'true';

  if (!enabled) {
    return;
  }

  if (route === '/') {
    return;
  }

  const telemetry: TelemetryData = {
    route,
    apiVersion: `${packageJson.version}`,
    timestamp: new Date(),
  };

  const url =
    process.env.TELEMETRY_URL && process.env.TELEMETRY_URL !== ''
      ? process.env.TELEMETRY_URL
      : 'https://log.pablofreitasnutri.com.br/telemetry';

  const client = createSafeAxios();
  client
    .post(url, telemetry)
    .then(() => {})
    .catch(() => {});
};
