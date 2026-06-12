import { StyleSheet } from 'react-native';
import { colors, shadows, typography } from '../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  loadingText: {
    fontFamily: typography?.main || 'Pretendard',
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  customMarkerImage: {
    width: 65,
    height: 65,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...shadows.card, // 테마에 정의된 그림자 사용
  },
});