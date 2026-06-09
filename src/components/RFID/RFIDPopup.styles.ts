// src/components/RFIDPopup.styles.ts
import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles/theme'; // 기존에 만드신 theme 활용

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay, // 'rgba(0, 0, 0, 0.7)'
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 316,
    // 내용물에 맞춰 자연스럽게 늘어나도록 고정 높이(height) 대신 padding 사용
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 31,
    paddingHorizontal: 33,
    alignItems: 'center',
  },
  popupImage: {
    width: 88.22,
    height: 70.75,
    marginBottom: 28,
  },
  textContainer: {
    alignItems: 'center',
    gap: 36, // 오토레이아웃 Gap 적용
    marginBottom: 37,
  },
  subTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    color: colors.grayDark, // '#8A8A8A'
    textAlign: 'center',
  },
  mainTitle: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24, // 텍스트가 길어질 경우를 대비해 살짝 여유를 줌
    color: colors.point, // '#1BC5CC'
    textAlign: 'center',
  },
  buttonContainer: {
    width: 250,
    gap: 12, // 오토레이아웃 Gap 적용
  },
  startButton: {
    height: 44,
    backgroundColor: colors.primary, // '#FFB826'
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2, // Android 전용 그림자
  },
  startButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
  backButton: {
    height: 44,
    backgroundColor: colors.grayLight, // '#E0E0E0'
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 16,
    color: colors.grayDark, // '#8A8A8A'
  },
});