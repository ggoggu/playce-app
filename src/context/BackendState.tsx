import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Linking from 'expo-linking';
import { getOrCreateAppInstanceId } from '../services/AppIdentity';
import {
  AnonymousClientResult,
  DEFAULT_SITE_ID,
  GameplayProgressResult,
  SitePackResult,
  TagBindingResult,
  createKhuroundApi,
  extractClaimToken,
} from '../services/KhuroundApi';

type RegistrationStatus =
  | '초기화 중'
  | '백엔드 연결 완료'
  | '백엔드 연결 실패'
  | '태그 등록 중'
  | '태그 등록 완료'
  | '태그 등록 실패';

interface BackendStateValue {
  appInstanceId: string;
  client: AnonymousClientResult | null;
  tagBinding: TagBindingResult | null;
  sitePack: SitePackResult | null;
  gameplayProgress: GameplayProgressResult | null;
  registrationStatus: RegistrationStatus;
  lastError: string | null;
  refreshSiteData: () => Promise<TagBindingResult | null>;
  claimTag: (rawClaimValue: string) => Promise<TagBindingResult>;
}

const BackendStateContext = createContext<BackendStateValue | null>(null);

export function BackendProvider({ children }: { children: React.ReactNode }) {
  const api = useMemo(() => createKhuroundApi(), []);
  const [appInstanceId, setAppInstanceId] = useState('');
  const [client, setClient] = useState<AnonymousClientResult | null>(null);
  const [tagBinding, setTagBinding] = useState<TagBindingResult | null>(null);
  const [sitePack, setSitePack] = useState<SitePackResult | null>(null);
  const [gameplayProgress, setGameplayProgress] = useState<GameplayProgressResult | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('초기화 중');
  const [lastError, setLastError] = useState<string | null>(null);
  const clientRef = useRef<AnonymousClientResult | null>(null);
  const handledClaimTokensRef = useRef<Set<string>>(new Set());

  const bootstrapClient = useCallback(async () => {
    const identity = await getOrCreateAppInstanceId();
    setAppInstanceId(identity);
    const bootstrappedClient = await api.bootstrapClient(identity);
    clientRef.current = bootstrappedClient;
    setClient(bootstrappedClient);
    return { identity, bootstrappedClient };
  }, [api]);

  const refreshSiteData = useCallback(async () => {
    const currentClient = clientRef.current ?? (await bootstrapClient()).bootstrappedClient;
    const [nextPack, nextProgress, bindingsResult] = await Promise.all([
      api.getSitePack(DEFAULT_SITE_ID),
      api.getGameplayProgress(currentClient.clientId, DEFAULT_SITE_ID),
      api.listTagBindings(),
    ]);
    const activeBinding = bindingsResult.bindings.find(
      (binding) =>
        binding.clientId === currentClient.clientId &&
        binding.siteId === DEFAULT_SITE_ID &&
        binding.status === 'ACTIVE',
    ) ?? null;
    setSitePack(nextPack);
    setGameplayProgress(nextProgress);
    setTagBinding(activeBinding);
    return activeBinding;
  }, [api, bootstrapClient]);

  const claimTag = useCallback(
    async (rawClaimValue: string) => {
      const claimToken = extractClaimToken(rawClaimValue);
      if (!claimToken) {
        throw new Error('claim token is empty');
      }

      setRegistrationStatus('태그 등록 중');
      setLastError(null);

      try {
        const identity = appInstanceId || (await getOrCreateAppInstanceId());
        if (!appInstanceId) setAppInstanceId(identity);
        const result = await api.claimTagBinding(identity, claimToken);
        setTagBinding(result);
        setRegistrationStatus('태그 등록 완료');
        try {
          await refreshSiteData();
        } catch (refreshError) {
          const refreshMessage = refreshError instanceof Error ? refreshError.message : String(refreshError);
          setLastError(`태그는 등록됐지만 최신 데이터를 불러오지 못했습니다: ${refreshMessage}`);
        }
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setRegistrationStatus('태그 등록 실패');
        setLastError(message);
        throw error;
      }
    },
    [api, appInstanceId, refreshSiteData],
  );

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        await bootstrapClient();
        if (cancelled) return;
        const existingBinding = await refreshSiteData();
        if (!cancelled) {
          setRegistrationStatus(existingBinding ? '태그 등록 완료' : '백엔드 연결 완료');
          setLastError(null);
        }
      } catch (error) {
        if (cancelled) return;
        setRegistrationStatus('백엔드 연결 실패');
        setLastError(error instanceof Error ? error.message : String(error));
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [bootstrapClient, refreshSiteData]);

  useEffect(() => {
    let cancelled = false;

    async function claimFromUrl(url: string | null) {
      if (cancelled || !url) return;
      const claimToken = extractClaimToken(url);
      if (!claimToken || handledClaimTokensRef.current.has(claimToken)) return;

      handledClaimTokensRef.current.add(claimToken);
      try {
        await claimTag(claimToken);
      } catch {
        handledClaimTokensRef.current.delete(claimToken);
      }
    }

    Linking.getInitialURL().then(claimFromUrl).catch(() => undefined);
    const subscription = Linking.addEventListener('url', ({ url }) => {
      claimFromUrl(url);
    });

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, [claimTag]);

  const value = useMemo(
    () => ({
      appInstanceId,
      client,
      tagBinding,
      sitePack,
      gameplayProgress,
      registrationStatus,
      lastError,
      refreshSiteData,
      claimTag,
    }),
    [
      appInstanceId,
      client,
      tagBinding,
      sitePack,
      gameplayProgress,
      registrationStatus,
      lastError,
      refreshSiteData,
      claimTag,
    ],
  );

  return <BackendStateContext.Provider value={value}>{children}</BackendStateContext.Provider>;
}

export function useBackendState(): BackendStateValue {
  const context = useContext(BackendStateContext);
  if (!context) {
    throw new Error('useBackendState must be used inside BackendProvider');
  }
  return context;
}
