import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from './theme';

export const commonStyles = StyleSheet.create({
  // 1. 화면 공통 뼈대
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // 2. 자주 쓰이는 Flex 정렬 블록
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // 3. 공통 UI 컴포넌트 뼈대 (버튼, 태그 등)
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  buttonText: {
    fontFamily: typography.main,
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },

  tagBase: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },

  baseButton: {
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  roundTag: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});