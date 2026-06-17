// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 🌟 추가된 부분
import BottomNav from '../components/BottomNav';
import { BackendProvider } from '../context/BackendState';

export default function RootLayout() {
  return (
    // 🌟 앱 전체를 GestureHandlerRootView로 감싸고, 반드시 flex: 1을 주어야 화면이 보입니다!
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackendProvider>
        {/* 🌟 Stack과 BottomNav를 함께 감싸주기 위해 View를 추가합니다. */}
        <View style={{ flex: 1 }}>
          
          {/* Stack이 각각의 페이지(홈, 코스, 이벤트 등)를 보여주는 역할을 합니다. */}
          <Stack screenOptions={{ headerShown: false }} />
          
          {/* 🌟 BottomNav를 Stack 바깥에 두면, 페이지가 넘어가도 파괴되지 않고 고정됩니다! */}
          <BottomNav />
          
        </View>
      </BackendProvider>
    </GestureHandlerRootView>
  );
}
