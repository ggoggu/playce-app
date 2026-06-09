// src/screens/AudioGuideScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, shadows } from '../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // image108 : bg_audio_history.png
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  // --- 상단 헤더 영역 ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginTop: 20,
    height: 84,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: colors.black,
    flex: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- 중앙 일러스트 영역 (피그마 레이어 구조 반영) ---
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 300, // 하단 플레이어 시트 공간 확보
  },
  // 배경 : bg_illust_haenggung.png
  illustBg: {
    position: 'absolute',
    width: 458,
    height: 382,
  },
  // 화성행궁 : building_haenggung.png
  mainIllust: {
    width: 358,
    height: 193,
    marginTop: 40,
    zIndex: 2,
  },
  // 구름 (좌측) : deco_cloud_1.png
  cloud1: {
    position: 'absolute',
    width: 73.5,
    height: 29,
    left: 65,
    top: 40,
    zIndex: 1,
  },
  // 구름 (우측) : deco_cloud_2.png
  cloud2: {
    position: 'absolute',
    width: 100.8,
    height: 39.7,
    right: 40,
    top: 15,
    zIndex: 1,
  },
  // 제목 박스 (코드로 직접 구현)
  titleBox: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderColor: colors.point,
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    ...shadows.light,
  },
  titleBoxText: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 14,
    color: colors.black,
  },

  // --- 하단 플레이어 시트 영역 ---
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: 359,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    ...shadows.light,
  },
  sheetInner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 45,
    alignItems: 'center',
  },
  
  // 코스 순서 노드 그룹
  nodeContainer: {
    flexDirection: 'row',
    gap: 35,
    marginBottom: 40,
  },
  nodeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeCircleActive: {
    backgroundColor: colors.point,
  },
  nodeCircleInactive: {
    backgroundColor: '#D9D9D9',
  },
  nodeText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 14,
    color: colors.white,
  },

  // 플레이어 내부 박스
  playerBox: {
    width: 318,
    height: 161,
    borderColor: colors.grayLight,
    borderWidth: 1.5,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'space-between',
  },
  playerTitleGroup: {
    marginBottom: 10,
  },
  playerTitle: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 12,
    color: colors.black,
  },
  playerSubTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 10,
    color: colors.grayDark,
    marginTop: 2,
  },
  
  // 재생 진행률 바
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBarBg: {
    width: 276,
    height: 4,
    backgroundColor: colors.grayLight,
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.grayDark,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 276,
    marginTop: 8,
  },
  timeText: {
    fontFamily: typography.main,
    fontSize: 8,
    color: colors.grayDark,
  },

  // 제어 컨트롤 버튼들
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  playButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});