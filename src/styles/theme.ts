import { ViewStyle, TextStyle } from 'react-native';

// 🎨 1. 앱 공통 색상 (Colors)
export const colors = {
  primary: '#FFB826',       // 메인 컬러 (플레이스 로고, 시작하기 버튼, 탭 활성화 등)
  point: '#1BC5CC',         // 포인트 컬러 (사용자 이름, 강조 텍스트 등)
  background: '#FFF9E6',    // 기본 앱 배경색
  nodeBg: '#FBFBDD',        // 코스 진행도 노드 바깥 원 배경색
  white: '#FFFFFF',
  black: '#000000',
  grayDark: '#8A8A8A',      // Middle Gray (서브 타이틀, 비활성화 아이콘 등)
  grayLight: '#E0E0E0',     // Light Gray (진행도 바 배경, 비활성 선 등)
  grayBorder: '#FAFAFA',    // BottomNav 상단 테두리 등
  overlay: 'rgba(0, 0, 0, 0.7)', // 팝업창 떴을 때 반투명 어두운 배경
};

// 🔤 2. 폰트 (Typography)
export const typography = {
  logo: 'Rammetto One',     // 영문 로고 전용
  main: 'Pretendard',       // 앱 기본 폰트
};

// ☁️ 3. 공통 그림자 스타일 (Shadows)
// 피그마에 있는 box-shadow 및 text-shadow 수치를 React Native에 맞게 변환했습니다.
export const shadows = {
  // 가벼운 그림자 (카드, 진행도 바, 코스 노드 원 등) - blur: 10, opacity: 10%
  light: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3, // Android 전용
  } as ViewStyle,
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  
  // 버튼 그림자 (시작하기 버튼 등) - blur: 20, opacity: 10%
  button: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  } as ViewStyle,

  // 바텀 네비게이션 전용 깊은 그림자 - y: 12, blur: 40, opacity: 8%
  bottomNav: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 10,
  } as ViewStyle,

  // PLAYCE 로고 전용 텍스트 그림자
  textLogo: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  } as TextStyle,
};