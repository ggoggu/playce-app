import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // 🌟 animation: 'none'을 추가해서 모든 화면 전환 애니메이션을 꺼버립니다!
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}