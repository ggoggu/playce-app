// src/app/onboarding.tsx
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';

const ONBOARDING_COMPLETE_KEY = 'playce.onboardingComplete';
const NICKNAME_KEY = 'playce.nickname';
const DEFAULT_NICKNAME = '행궁체험사랑';

export default function Onboarding() {
  const router = useRouter();

  // 온보딩 스크린에서 '시작하기'를 눌렀을 때 실행될 함수
  const handleComplete = async (nextNickname: string) => {
    const nickname = nextNickname.trim() || DEFAULT_NICKNAME;
    
    // 데이터 저장
    await SecureStore.setItemAsync(NICKNAME_KEY, nickname);
    await SecureStore.setItemAsync(ONBOARDING_COMPLETE_KEY, 'true');
    
    // 저장이 끝나면 홈으로 이동!
    router.replace('/'); 
  };

  return <OnboardingScreen onComplete={handleComplete} />;
}