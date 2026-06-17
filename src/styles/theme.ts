import { Platform, ViewStyle, TextStyle } from 'react-native';

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

export function createShadowStyle(
  offsetX: number,
  offsetY: number,
  blurRadius: number,
  opacity: number,
  elevation: number,
  color = '#000000',
): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `${offsetX}px ${offsetY}px ${blurRadius}px ${toRgba(color, opacity)}`,
    } as ViewStyle;
  }

  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: blurRadius,
    elevation,
  };
}

function textShadowStyle(offsetX: number, offsetY: number, blurRadius: number, opacity: number): TextStyle {
  if (Platform.OS === 'web') {
    return {
      textShadow: `${offsetX}px ${offsetY}px ${blurRadius}px rgba(0, 0, 0, ${opacity})`,
    } as TextStyle;
  }

  return {
    textShadowColor: `rgba(0, 0, 0, ${opacity})`,
    textShadowOffset: { width: offsetX, height: offsetY },
    textShadowRadius: blurRadius,
  };
}

function toRgba(color: string, opacity: number): string {
  if (!color.startsWith('#') || (color.length !== 7 && color.length !== 4)) {
    return color;
  }

  const normalized = color.length === 4
    ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    : color;
  const red = parseInt(normalized.slice(1, 3), 16);
  const green = parseInt(normalized.slice(3, 5), 16);
  const blue = parseInt(normalized.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

// ☁️ 3. 공통 그림자 스타일 (Shadows)
// 피그마에 있는 box-shadow 및 text-shadow 수치를 플랫폼별 스타일로 변환했습니다.
export const shadows = {
  // 가벼운 그림자 (카드, 진행도 바, 코스 노드 원 등) - blur: 10, opacity: 10%
  light: createShadowStyle(0, 0, 10, 0.1, 3),
  card: createShadowStyle(0, 0, 16, 0.1, 4),
  
  // 버튼 그림자 (시작하기 버튼 등) - blur: 20, opacity: 10%
  button: createShadowStyle(0, 0, 20, 0.1, 4),

  // 바텀 네비게이션 전용 깊은 그림자 - y: 12, blur: 40, opacity: 8%
  bottomNav: createShadowStyle(0, 12, 40, 0.08, 10),

  // PLAYCE 로고 전용 텍스트 그림자
  textLogo: textShadowStyle(0, 0, 20, 0.2),
};
