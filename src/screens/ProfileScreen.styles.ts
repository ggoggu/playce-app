// src/screens/ProfileScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from '../styles/theme'; // 1단계에서 만든 테마 불러오기

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // #FFF9E6
    alignItems: 'center',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 68, // 상단 여백
    width: '100%',
  },
  
  // --- 프로필 정보 영역 ---
  avatarCircle: {
    width: 79,
    height: 79,
    backgroundColor: colors.grayLight, // #E0E0E0
    borderRadius: 39.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarIcon: {
    fontSize: 32,
  },
  nickname: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 24,
    color: colors.black,
    marginBottom: 14,
  },
  editProfileBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grayLight,
    backgroundColor: 'transparent',
  },
  editProfileText: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 10,
    color: colors.grayDark, // #8A8A8A
  },

  // --- 태그 관리 카드 영역 ---
  tagCard: {
    width: 358,
    backgroundColor: colors.background, // #FFF9E6
    borderRadius: 12,
    paddingVertical: 26,
    paddingHorizontal: 20,
    marginTop: 30,
    ...shadows.card, // 1단계에서 세팅한 공통 그림자
  },
  tagCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  tagCardTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    color: colors.grayDark,
  },
  tagStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tagStatusBox: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grayDark,
    backgroundColor: colors.grayDark,
  },
  tagStatusText: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    color: colors.grayLight,
  },
  tagConnectedText: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 14,
    color: colors.point, // #1BC5CC
  },
  
  // --- 버튼 ---
  qrButton: {
    width: '100%',
    height: 41,
    backgroundColor: colors.point, // #1BC5CC
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  qrButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
  deleteButton: {
    width: '100%',
    height: 41,
    backgroundColor: colors.grayLight, // #E0E0E0
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.grayDark,
  },
  sheetContainer: {
    // 하단 바(BottomNav) 위로 시트가 올라오도록 zIndex 설정
    zIndex: 10, 
  },
  sheetIndicator: {
    // 피그마: tabler:arrow-up 아이콘을 대체하는 세련된 핸들 바
    width: 67,
    height: 5,
    backgroundColor: '#FFFFFF', // 피그마 핸들 색상 적용
    borderRadius: 3,
    marginTop: 10,
  },
  sheetContentContainer: {
    flex: 1,
    paddingHorizontal: 40, // 좌우 여백
    paddingTop: 28, // 상단 여백
  },
  sheetTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  statSection: {
    marginBottom: 29, // 섹션 간 간격
    width: '100%',
  },
  statHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  // '탐험 달성률', '탐험 시간' 회색 둥근 태그
  statTag: {
    backgroundColor: '#8A8A8A',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40,
    marginRight: 8,
  },
  statTagText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    color: '#E0E0E0',
  },
  statSubText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 10,
    color: 'rgba(138, 138, 138, 0.7)',
    flex: 1, // 남은 공간 차지
  },
  timeValueText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },

  // 진행률 바 (Progress Bar)
  progressBarBg: {
    width: '100%',
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    justifyContent: 'center', // 세로 중앙 정렬
    paddingHorizontal: 4, // 피그마 기준 내부 여백 (left: 6, top: 4 보정)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  progressBarFill: {
    height: 20,
    backgroundColor: '#1BC5CC',
    borderRadius: 20,
  },
  progressText: {
    position: 'absolute', // 바 위에 텍스트를 띄움
    alignSelf: 'center',  // 가로 중앙 정렬
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 10,
    color: '#8A8A8A',
  },
});