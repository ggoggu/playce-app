import { StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, shadows } from '../styles/theme';

export const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  bgGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transform: [{ scaleX: -1 }], 
  },
  bgPathContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    top: -32,
  },
  bgPath: {
    width: 325.64,
    height: 707.28,
  },
  treesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  tree: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.7, 
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 35,
    zIndex: 1, 
  },
  header: {
    marginTop: 50,
  },
  logoText: {
    fontFamily: typography.logo,
    fontSize: 20,
    color: colors.primary,
    ...shadows.textLogo,
  },
  topSection: {
    marginTop: 20,
    gap: 10,
  },
  mainTitle: {
    fontFamily: typography.main,
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: colors.point,
  },
  progressWrapper: {
    width: 197.13,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    ...shadows.light,
  },
  progressLabel: {
    fontFamily: typography.main,
    fontWeight: '600',
    fontSize: 10,
    color: colors.grayDark,
  },
  progressRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  progressBarBg: {
    width: 44,
    height: 12,
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '0%', 
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressValue: {
    fontFamily: typography.main,
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: colors.grayDark,
  },
  nodesContainer: {
    alignSelf: 'center',
    marginTop: 35,
    width: 257.17,
    height: 416.34,
    justifyContent: 'space-between', 
  },
  nodeRowTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 65, 
  },
  nodeRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nodeRowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 59, 
  },
  nodeWrapper: {
    width: 74.78,
    height: 74.78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeOuterCircle: {
    width: 74.78,
    height: 74.78,
    backgroundColor: colors.nodeBg,
    borderRadius: 37.39,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.light,
  },
  nodeInnerCircle: {
    width: 58.78,
    height: 58.78,
    backgroundColor: colors.primary,
    borderRadius: 29.39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeImage: {
    width: 51.83,
    height: 51.83,
  },
  nodeBadge: {
    position: 'absolute',
    top: -11.42, 
    left: -3.22,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeBadgeText: {
    fontFamily: typography.main,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: colors.white,
    marginTop: 2, 
  }
});