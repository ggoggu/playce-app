// src/app/index.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MainScreen from '../screens/MainScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const ONBOARDING_COMPLETE_KEY = 'playce.onboardingComplete';
const NICKNAME_KEY = 'playce.nickname';
const DEFAULT_NICKNAME = '행궁체험사랑';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [, setNickname] = useState(DEFAULT_NICKNAME);

  useEffect(() => {
    let mounted = true;

    async function loadOnboardingState() {
      try {
        const [storedComplete, storedNickname] = await Promise.all([
          SecureStore.getItemAsync(ONBOARDING_COMPLETE_KEY),
          SecureStore.getItemAsync(NICKNAME_KEY),
        ]);
        if (!mounted) return;
        setOnboardingComplete(storedComplete === 'true');
        setNickname(storedNickname || DEFAULT_NICKNAME);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadOnboardingState();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (!onboardingComplete) {
    return (
      <OnboardingScreen
        onComplete={(nextNickname) => {
          const nickname = nextNickname.trim() || DEFAULT_NICKNAME;
          setNickname(nickname);
          setOnboardingComplete(true);
          void SecureStore.setItemAsync(NICKNAME_KEY, nickname);
          void SecureStore.setItemAsync(ONBOARDING_COMPLETE_KEY, 'true');
        }}
      />
    );
  }

  return <MainScreen />;
}

function LoadingSplash() {
  return (
    <View style={styles.splash}>
      <Text style={styles.logo}>PLAYCE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9E6',
  },
  logo: {
    color: '#FFB826',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
