import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, shadows } from '../styles/theme';
import { commonStyles } from '../styles/common';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 294;
const CARD_GAP = 28;
export const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    ...commonStyles.rowBetween,
    paddingHorizontal: 38,
    marginTop: 30, 
    height: 34,
  },
  logoText: {
    fontFamily: typography.logo,
    fontSize: 20,
    color: colors.primary,
    ...shadows.textLogo,
  },
  hamburgerButton: { width: 24, height: 24, justifyContent: 'space-evenly', alignItems: 'center' },
  hamburgerLine: { width: 18, height: 2, backgroundColor: colors.grayDark },
  
  titleArea: { paddingHorizontal: 38, marginTop: 34 },
  mainTitle: {
    fontFamily: typography.main,
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: colors.black,
  },
  pointText: { color: colors.point },
  subTitle: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: colors.grayDark,
    marginTop: 19,
  },

  sliderContainer: { marginTop: 28, height: 395 },
  scrollContent: { paddingHorizontal: SIDE_PADDING, gap: CARD_GAP },
  
  cardWrapper: {
    width: CARD_WIDTH,
    height: 395,
    borderRadius: 20,
    backgroundColor: colors.white,
    ...shadows.light,
    overflow: 'hidden', 
  },
  cardBg: { flex: 1, padding: 22, justifyContent: 'space-between' },
  
  cardIllustration: {
    position: 'absolute',
    width: 320,
    height: 237,
    left: -13, 
    top: 116,
  },

  cardContentTop: { gap: 14 },
  tag: {
    ...commonStyles.tagBase,
    width: 52,
    height: 22,
  },
  tagIcon: { width: 11.5, height: 10, backgroundColor: colors.primary, borderRadius: 2 },
  tagText: { fontSize: 10, fontWeight: '600', color: 'rgba(0, 0, 0, 0.7)' },
  
  cardTextGroup: { gap: 12 },
  cardTitle: { fontSize: 24, fontWeight: '700', color: colors.white },
  cardDesc: { fontSize: 10, fontWeight: '400', color: colors.grayLight, lineHeight: 14 },

  startButton: {
    ...commonStyles.primaryButton,
    width: 250,
    height: 52,
    alignSelf: 'center',
  },
  startButtonText: { fontSize: 16, fontWeight: '700', color: colors.white },
});