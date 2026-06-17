import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const APP_INSTANCE_ID_KEY = 'khuround.playce.appInstanceId';

let memoryAppInstanceId: string | null = null;

export async function getOrCreateAppInstanceId(): Promise<string> {
  const existing = await readStoredAppInstanceId();
  if (existing) return existing;

  const next = `app_${createRandomId()}`;
  await writeStoredAppInstanceId(next);
  memoryAppInstanceId = next;
  return next;
}

async function readStoredAppInstanceId(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return readWebStorage();
  }

  try {
    return await SecureStore.getItemAsync(APP_INSTANCE_ID_KEY);
  } catch {
    return memoryAppInstanceId;
  }
}

async function writeStoredAppInstanceId(value: string): Promise<void> {
  if (Platform.OS === 'web') {
    writeWebStorage(value);
    return;
  }

  try {
    await SecureStore.setItemAsync(APP_INSTANCE_ID_KEY, value);
  } catch {
    memoryAppInstanceId = value;
  }
}

function readWebStorage(): string | null {
  if (typeof globalThis.localStorage === 'undefined') return memoryAppInstanceId;
  return globalThis.localStorage.getItem(APP_INSTANCE_ID_KEY);
}

function writeWebStorage(value: string): void {
  if (typeof globalThis.localStorage === 'undefined') {
    memoryAppInstanceId = value;
    return;
  }
  globalThis.localStorage.setItem(APP_INSTANCE_ID_KEY, value);
}

function createRandomId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && 'randomUUID' in cryptoApi) {
    return cryptoApi.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
