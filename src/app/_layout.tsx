// src/app/_layout.tsx
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 🌟 추가된 부분
import BottomNav from '../components/BottomNav'; 

export default function RootLayout() {
  return (
    // 🌟 앱 전체를 GestureHandlerRootView로 감싸고, 반드시 flex: 1을 주어야 화면이 보입니다!
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs 
        screenOptions={{ headerShown: false }}
        tabBar={() => <BottomNav />} 
      />
    </GestureHandlerRootView>
  );
}