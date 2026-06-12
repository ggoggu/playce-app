import { StyleSheet } from 'react-native';
import { colors, shadows } from '../styles/theme';

export const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    bottom: 130, // 바텀 네비게이션(BottomNav) 위쪽에 안정적으로 띄우기 위함
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 99,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card, // 공통 테마 그림자 적용
  },
  imageWrapper: {
    width: 64,
    height: 64,
    backgroundColor: colors.nodeBg, // 테마에 등록된 노드 배경색 (#FBFBDD)
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  image: {
    width: 44,
    height: 44,
  },
  infoWrapper: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
    color: colors.black,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '600',
  },
  description: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 18,
  },
});