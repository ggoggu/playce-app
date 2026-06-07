import { Tabs } from 'expo-router';
import BottomNav from '../components/BottomNav'; // 🌟 하단 바 불러오기

export default function RootLayout() {
  return (
    // 🌟 Stack 대신 Tabs를 사용합니다!
    // tabBar 속성에 우리가 만든 BottomNav를 넣어주면, 앱 전체에 딱 1번만 고정됩니다.
    <Tabs 
      screenOptions={{ headerShown: false }}
      tabBar={() => <BottomNav />} 
    />
  );
}