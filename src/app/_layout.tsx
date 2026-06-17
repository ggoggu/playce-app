// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 🌟 추가된 부분
import { BackendProvider } from '../context/BackendState';

export default function RootLayout() {
  return (
    // 🌟 앱 전체를 GestureHandlerRootView로 감싸고, 반드시 flex: 1을 주어야 화면이 보입니다!
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackendProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BackendProvider>
    </GestureHandlerRootView>
  );
}
