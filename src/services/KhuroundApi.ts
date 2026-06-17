import Constants from 'expo-constants';
import { Platform } from 'react-native';

declare const process:
  | {
      env?: Record<string, string | undefined>;
    }
  | undefined;

export const DEFAULT_SITE_ID = 'suwon_01';
export const KHUROUND_API_BASE_URL =
  readConfiguredBaseUrl() || defaultBaseUrlForPlatform();

export interface AnonymousClientResult {
  schemaVersion: number;
  clientId: string;
  sessionToken: string;
  issuedAt: string;
}

export interface TagBindingResult {
  schemaVersion: number;
  tagBindingId: string;
  clientId: string;
  siteId: string;
  epc: string;
  boundAt: string;
  status: string;
}

export interface TagBindingsResult {
  schemaVersion: number;
  bindings: TagBindingResult[];
}

export interface SiteCoordinate {
  lat: number;
  lng: number;
}

export interface SiteCourseNode {
  checkpointId: string;
  courseId?: string | null;
  readerId?: string | null;
  readerType?: string | null;
  sceneId: string;
  name: string;
  description?: string | null;
  lat: number;
  lng: number;
  courseOrder?: number | null;
  bgmAudioId?: string | null;
  narrationAudioId?: string | null;
}

export interface SiteCourse {
  courseId: string;
  siteId: string;
  title: string;
  description?: string | null;
  color?: string | null;
  sortOrder?: number | null;
  active: boolean;
  nodes: SiteCourseNode[];
}

export interface SiteMapRegion {
  regionId: string;
  siteId: string;
  title: string;
  subtitle?: string | null;
  centerLat: number;
  centerLng: number;
  defaultZoom?: number | null;
  sortOrder?: number | null;
  active: boolean;
}

export interface SiteGameplayMap {
  provider: string;
  activeRegionId?: string | null;
  defaultCenter?: SiteCoordinate | null;
  defaultZoom?: number | null;
  regions: SiteMapRegion[];
}

export interface SiteAudioAsset {
  id: string;
  audioId?: string | null;
  type: string;
  title?: string | null;
  filename?: string | null;
  url?: string | null;
  dur_ms?: number | null;
  loop: boolean;
  hash?: string | null;
  ver?: number | null;
}

export interface SitePackResult {
  schemaVersion: number;
  manifestVersion: number;
  siteId: string;
  updatedAt: string;
  coreAudioIds: string[];
  audioCatalog: SiteAudioAsset[];
  courses: SiteCourse[];
  courseNodes: SiteCourseNode[];
  map?: SiteGameplayMap | null;
  waypoints: unknown[];
  quests: unknown[];
  collections: unknown[];
  currencies: unknown[];
  settings: Record<string, unknown>;
}

export interface GameplayProgressResult {
  schemaVersion: number;
  clientId: string;
  siteId: string;
  regionalProgressPercent: number;
  quests: unknown[];
  collections: unknown[];
  wallet: unknown[];
  lastEventAt?: string | null;
}

export interface SessionResult {
  schemaVersion: number;
  sessionId: string;
  userId: string;
  siteId: string;
  status: string;
  startedAt: string;
  zoneId?: string | null;
  subzoneId?: string | null;
}

export interface HeartbeatResult {
  schemaVersion: number;
  sessionId: string;
  acceptedAt: string;
  zoneId?: string | null;
  subzoneId?: string | null;
}

export interface SessionSyncResult {
  events: unknown[];
  cursor?: string | null;
}

export interface CreateSessionPayload {
  userId: string;
  siteId: string;
  manifestVersion: number;
  startedAt: string;
  lat: number;
  lng: number;
}

export interface HeartbeatPayload {
  sessionId: string;
  sentAt: string;
  lat: number;
  lng: number;
  speedMps?: number;
}

export interface KhuroundApi {
  baseUrl: string;
  bootstrapClient(appInstanceId: string): Promise<AnonymousClientResult>;
  claimTagBinding(appInstanceId: string, claimToken: string): Promise<TagBindingResult>;
  listTagBindings(): Promise<TagBindingsResult>;
  getSitePack(siteId?: string): Promise<SitePackResult>;
  getGameplayProgress(clientId: string, siteId?: string): Promise<GameplayProgressResult>;
  createSession(payload: CreateSessionPayload): Promise<SessionResult>;
  heartbeat(sessionId: string, payload: HeartbeatPayload): Promise<HeartbeatResult>;
  sync(sessionId: string, cursor?: string | null): Promise<SessionSyncResult>;
  webSocketUrl(sessionId: string): string;
}

export function createKhuroundApi(baseUrl = KHUROUND_API_BASE_URL): KhuroundApi {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  return {
    baseUrl: normalizedBaseUrl,

    bootstrapClient(appInstanceId) {
      return requestJson<AnonymousClientResult>(normalizedBaseUrl, '/v1/clients/bootstrap', {
        method: 'POST',
        body: JSON.stringify({ appInstanceId }),
      });
    },

    claimTagBinding(appInstanceId, claimToken) {
      return requestJson<TagBindingResult>(normalizedBaseUrl, '/v1/tag-bindings/claim', {
        method: 'POST',
        body: JSON.stringify({ appInstanceId, claimToken }),
      });
    },

    listTagBindings() {
      return requestJson<TagBindingsResult>(normalizedBaseUrl, '/v1/tag-bindings');
    },

    getSitePack(siteId = DEFAULT_SITE_ID) {
      return requestJson<SitePackResult>(normalizedBaseUrl, `/v1/sites/${encodeURIComponent(siteId)}/pack`);
    },

    getGameplayProgress(clientId, siteId = DEFAULT_SITE_ID) {
      const query = new URLSearchParams({ clientId, siteId });
      return requestJson<GameplayProgressResult>(
        normalizedBaseUrl,
        `/v1/profile/gameplay-progress?${query.toString()}`,
      );
    },

    createSession(payload) {
      return requestJson<SessionResult>(normalizedBaseUrl, '/v1/sessions', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    heartbeat(sessionId, payload) {
      return requestJson<HeartbeatResult>(
        normalizedBaseUrl,
        `/v1/sessions/${encodeURIComponent(sessionId)}/heartbeat`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      );
    },

    sync(sessionId, cursor = null) {
      const query = cursor ? `?${new URLSearchParams({ cursor }).toString()}` : '';
      return requestJson<SessionSyncResult>(
        normalizedBaseUrl,
        `/v1/sessions/${encodeURIComponent(sessionId)}/sync${query}`,
      );
    },

    webSocketUrl(sessionId) {
      return makeKhuroundWebSocketUrl(normalizedBaseUrl, sessionId);
    },
  };
}

export function extractClaimToken(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  try {
    const parsed = new URL(trimmed);
    return parsed.searchParams.get('token')?.trim() || trimmed;
  } catch {
    return trimmed;
  }
}

export function makeKhuroundWebSocketUrl(baseUrl: string, sessionId: string): string {
  const parsed = new URL(normalizeBaseUrl(baseUrl));
  parsed.protocol = parsed.protocol === 'https:' ? 'wss:' : 'ws:';
  parsed.pathname = '/v1/ws';
  parsed.search = new URLSearchParams({ sessionId }).toString();
  return parsed.toString();
}

async function requestJson<T>(baseUrl: string, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorCode = body?.errorCode || body?.error || response.statusText;
    throw new Error(`${response.status} ${errorCode}`);
  }

  return body as T;
}

function readConfiguredBaseUrl(): string {
  const envValue = readProcessEnv('EXPO_PUBLIC_KHUROUND_API_BASE_URL');
  const extra = Constants.expoConfig?.extra as Record<string, unknown> | undefined;
  const extraValue = extra?.khuroundApiBaseUrl;
  const normalizedEnvValue = typeof envValue === 'string' ? envValue.trim() : '';
  const normalizedExtraValue = typeof extraValue === 'string' ? extraValue.trim() : '';
  return normalizedEnvValue
    ? normalizedEnvValue
    : normalizedExtraValue
      ? normalizedExtraValue
      : '';
}

function readProcessEnv(key: string): string | undefined {
  if (typeof process === 'undefined') return undefined;
  return process.env?.[key];
}

function defaultBaseUrlForPlatform(): string {
  const expoHostBaseUrl = defaultBaseUrlFromExpoHost();
  if (expoHostBaseUrl) return expoHostBaseUrl;
  if (Platform.OS === 'android') return 'http://10.0.2.2:4300';
  return 'http://127.0.0.1:4300';
}

function defaultBaseUrlFromExpoHost(): string {
  if (Platform.OS === 'web') return '';
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return '';

  try {
    const parsed = new URL(hostUri.includes('://') ? hostUri : `http://${hostUri}`);
    const host = parsed.hostname;
    if (!host || ['localhost', '127.0.0.1', '::1', '10.0.2.2'].includes(host)) {
      return '';
    }
    return `http://${host}:4300`;
  } catch {
    return '';
  }
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}
