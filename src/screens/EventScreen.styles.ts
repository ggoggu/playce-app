// src/screens/EventScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../styles/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // #FFF9E6
  },
  scrollView: {
    paddingBottom: 100, // BottomNav 공간 확보
  },
  
  // --- 상단 그라데이션 및 로고 영역 ---
  topBackground: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 343,
  },
  logoText: {
    fontFamily: typography.logo,
    fontSize: 20,
    color: colors.white,
    marginTop: 60,
    marginLeft: 39,
  },

  // --- 섹션 공통 스타일 ---
  sectionContainer: {
    marginTop: 40,
    paddingHorizontal: 39,
  },
  sectionTitle: {
    fontFamily: typography.main,
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: colors.point, // #1BC5CC
    marginBottom: 8,
  },
  sectionSubTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 20,
  },

  // --- 카테고리 필터 영역 ---
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 39,
    marginTop: 80,
    gap: 6,
  },
  filterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.point,
    gap: 4,
  },
  filterBadgeActive: {
    backgroundColor: colors.point,
  },
  filterText: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    color: colors.point,
  },
  filterTextActive: {
    color: colors.white,
  },
  filterHint: {
    fontFamily: typography.main,
    fontSize: 10,
    color: colors.grayDark,
    marginLeft: 39,
    marginTop: 8,
  },

  // --- 카드 스크롤 뷰 ---
  horizontalScroll: {
    paddingLeft: 39,
    paddingRight: 20,
    gap: 20,
  },

  // --- 정방형 이벤트 카드 ("이런곳도 가보고 싶어요!") ---
  squareCard: {
    width: 316,
    height: 316,
    borderRadius: 9,
    backgroundColor: colors.point,
    overflow: 'hidden',
    marginRight: 20,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  statusTag: {
    backgroundColor: colors.point,
    paddingVertical: 3,
    paddingHorizontal: 11,
    borderRadius: 22,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '600',
  },
  cardTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSub: {
    color: colors.grayLight,
    fontSize: 9,
  },

  // --- 세로형 포스터 카드 ("여기가 제일 핫하대요!") ---
  posterCard: {
    width: 318,
    height: 497,
    borderRadius: 11,
    backgroundColor: colors.point,
    overflow: 'hidden',
    marginRight: 20,
  },
  posterTitle: {
    color: colors.white,
    fontSize: 33,
    fontWeight: '800',
    textAlign: 'right',
  },

  // --- 내 업적 플로팅 버튼 ---
  achievementButton: {
    position: 'absolute',
    bottom: 120,
    right: 24,
    backgroundColor: colors.primary, // #FFB826
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 10,
  },
  achievementText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  }
});