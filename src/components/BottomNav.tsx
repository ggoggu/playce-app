import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

// 🌟 세팅한 SVG 아이콘들을 불러옵니다.
import IconHome from '../assets/icons/IconHome.svg';
import IconCourse from '../assets/icons/IconCourse.svg';
import IconEvent from '../assets/icons/IconEvent.svg';
import IconProfile from '../assets/icons/IconProfile.svg';
import IconSetting from '../assets/icons/IconSetting.svg';

// 🌟 기존 탭 정보에 Icon 컴포넌트를 추가로 짝지어 줍니다.
const NAV_ITEMS = [
  { name: '홈', path: '/', Icon: IconHome },
  { name: '코스선택', path: '/course', Icon: IconCourse },
  { name: '이벤트', path: '/event', Icon: IconEvent },
  { name: '프로필', path: '/profile', Icon: IconProfile },
  { name: '환경설정', path: '/setting', Icon: IconSetting },
];

export default function BottomNav() {
  const router = useRouter(); // 페이지 이동 담당
  const pathname = usePathname(); // 현재 주소 확인

  // 특정 페이지에서 네비게이션 바 숨기기 (기존 기능 유지)
  if (pathname === '/audio-guide' || pathname === '/qr-scan') {
    return null;
  }

  return (
    <View style={styles.bottomNavWrapper} pointerEvents="box-none">
      {/* 바깥쪽 컨테이너 (362 x 83) */}
      <View style={styles.bottomNavContainer}>
        
        {/* 내부 정렬 컨테이너 (308 x 45) : 피그마의 정확한 간격을 구현하기 위해 추가 */}
        <View style={styles.innerContainer}>
          {NAV_ITEMS.map((tab, index) => {
            // 현재 주소와 탭의 주소가 같으면 활성화 상태
            const isActive = pathname === tab.path;
            const iconColor = isActive ? '#FFB826' : 'rgba(0, 0, 0, 0.6)';
            
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.navItem}
                onPress={() => router.navigate(tab.path as any)} // 🌟 기존 터치 기능 유지
                activeOpacity={0.7}
              >
                {/* SVG 아이콘 (32x32) */}
                <View style={styles.iconWrapper}>
                  <tab.Icon width={32} height={32} fill={iconColor} color={iconColor} />
                </View>
                
                {/* 텍스트 (Pretendard 적용) */}
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 30, // 화면 하단 여백 (기존 유지)
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavContainer: {
    width: 362,
    height: 83,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    borderTopWidth: 2,
    borderColor: '#FAFAFA',
    // 오토레이아웃 패딩 (상하 19px, 좌우 27px)
    paddingVertical: 19,
    paddingHorizontal: 27,
    alignItems: 'center',
    justifyContent: 'center',
    // 그림자 (Figma: 0px 12px 40px -4px rgba(0, 0, 0, 0.08))
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 18, 
    elevation: 10,
  },
  innerContainer: {
    width: 308,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 37, // Figma 오토레이아웃 아이템 간 간격
  },
  navItem: {
    width: 32,
    height: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3, // Figma 아이콘과 텍스트 사이 간격
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontFamily: 'Pretendard', // 🌟 세팅한 폰트 적용
    fontWeight: '400',
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  navTextActive: {
    color: '#FFB826',
  }
});