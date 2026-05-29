import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // headerShown: false 를 통해 불필요한 상단 헤더와 기본 UI를 모두 숨깁니다.
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
