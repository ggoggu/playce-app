import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router'; // 🌟 페이지 이동 마법사들 불러오기

// 🌟 탭 이름과 2단계에서 만든 주소(URL)를 짝지어 줍니다.
const NAV_ITEMS = [
  { name: '홈', path: '/' },
  { name: '코스선택', path: '/course' },
  { name: '이벤트', path: '/event' },
  { name: '프로필', path: '/profile' },
  { name: '환경설정', path: '/setting' },
];

export default function BottomNav() {
  const router = useRouter(); // 페이지 이동을 담당
  const pathname = usePathname(); // 현재 내가 있는 주소를 확인

  if (pathname === '/audio-guide' || pathname === '/qr-scan') {
    return null;
  }

  return (
    <View style={styles.bottomNavWrapper} pointerEvents="box-none">
      <View style={styles.bottomNavContainer}>
        {NAV_ITEMS.map((tab, index) => {
          // 🌟 내 현재 주소와 탭의 주소가 같으면 자동으로 불이 켜집니다!
          const isActive = pathname === tab.path;
          
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.navItem}
              onPress={() => router.navigate(tab.path as any)} // 🌟 터치하면 해당 주소로 순간이동!
            >
              <View style={[styles.navIconPlaceholder, isActive && { borderColor: '#FFB826' }]} />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 362,
    height: 83,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    borderTopWidth: 2,
    borderColor: '#FAFAFA',
    paddingHorizontal: 27,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconPlaceholder: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    marginBottom: 3,
  },
  navText: {
    fontSize: 8,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '400',
  },
  navTextActive: {
    color: '#FFB826',
  }
});