// src/components/CourseCompletePopup.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, createShadowStyle, typography } from '../styles/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 999, // 화면 최상단에 띄우기
  },
  popupContainer: {
    alignItems: 'center',
    gap: 91,
  },
  topSection: {
    alignItems: 'center',
    gap: 90,
  },
  mainTitle: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: colors.white,
    textAlign: 'center',
    width: 172,
  },
  badgeSection: {
    alignItems: 'center',
    gap: 42,
  },
  // 노란색 후광(Glow) 효과가 들어간 배지 원형 배경
  badgeCircle: {
    width: 193,
    height: 193,
    backgroundColor: colors.grayLight, // '#E0E0E0'
    borderRadius: 96.5,
    justifyContent: 'center',
    alignItems: 'center',
    // 플랫폼별 Glow 효과
    ...createShadowStyle(0, 0, 20, 0.8, 20, colors.primary),
  },
  badgeImage: {
    width: 80,
    height: 80,
  },
  badgePlaceholderText: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    color: colors.grayDark,
  },
  badgeTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
  buttonGroup: {
    gap: 12,
  },
  continueButton: {
    width: 288,
    height: 52,
    backgroundColor: colors.primary, // '#FFB826'
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...createShadowStyle(0, 4, 8, 0.1, 4),
  },
  continueButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
  badgeBoxButton: {
    width: 288,
    height: 52,
    backgroundColor: colors.grayLight, // '#E0E0E0'
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...createShadowStyle(0, 4, 8, 0.1, 4),
  },
  badgeBoxButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.grayDark, // '#8A8A8A'
  },
});
