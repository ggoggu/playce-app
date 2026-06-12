// src/screens/SettingScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors, typography } from '../styles/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    paddingHorizontal: 38,
    paddingBottom: 120, // BottomNav 공간 확보
  },
  
  // --- 프로필 영역 ---
  profileSection: {
    alignItems: 'center',
    marginTop: 68, // 피그마 상단 여백 참고
    marginBottom: 40,
  },
  profileImageCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileTitle: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 18,
    color: colors.black,
  },

  // --- 섹션 타이틀 (ex: 오디오) ---
  sectionTitle: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 16,
  },

  // --- 구분선 ---
  divider: {
    height: 1,
    backgroundColor: colors.grayLight,
    marginVertical: 24,
    width: '100%',
  },

  // --- 공통 행(Row) 스타일 ---
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    minHeight: 32,
  },
  rowLabel: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 14,
    color: colors.black,
  },
  rowValueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rowValueText: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 14,
    color: colors.point, // #1BC5CC
  },
  rowDescription: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 10,
    color: colors.grayDark,
    marginTop: 4,
    marginBottom: 16,
  },
});