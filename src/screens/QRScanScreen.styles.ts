import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SCAN_BOX_SIZE = 240; // 스캔 영역 가로세로 길이

export const styles = StyleSheet.create({
  // 1. 전체 화면 영역
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // 2. 카메라 위에 겹쳐지는 UI 오버레이
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  // 3. 중앙 QR 스캔 타겟 박스
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    justifyContent: 'space-between',
    marginBottom: 120, // 하단 패널 공간만큼 위로 밀어주기
  },
  
  // 모서리 정렬을 위한 가로 행
  cornerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // 4개의 모서리 공통 및 개별 스타일 (#1BC5CC 포인트 컬러)
  corner: {
    width: 42,
    height: 41,
    borderColor: '#1BC5CC',
  },
  topLeft: {
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderTopLeftRadius: 4,
  },
  topRight: {
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderTopRightRadius: 4,
  },
  bottomLeft: {
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderBottomLeftRadius: 4,
  },
  bottomRight: {
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderBottomRightRadius: 4,
  },

  // "QR 코드를 사각형 안에 맞춰주세요" 텍스트
  guideText: {
    position: 'absolute',
    top: SCAN_BOX_SIZE + 20,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    width: '100%',
  },

  // 4. 하단 흰색 안내 패널
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 303, // 피그마 기준 높이
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 36,
    paddingHorizontal: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  
  // PLAYCE 로고
  logoText: {
    position: 'absolute',
    top: 36,
    left: 39,
    fontFamily: 'Rammetto One',
    fontSize: 20,
    color: '#1BC5CC',
  },
  
  // 패널 중앙 텍스트 그룹
  textContainer: {
    marginTop: 58,
    alignItems: 'center',
    gap: 13, // 오토레이아웃 간격
  },
  title: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 24,
    color: '#1BC5CC',
  },
  subTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  
  // 직접 입력하기 버튼
  manualButton: {
    marginTop: 10,
    padding: 10,
  },
  manualText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // 뒤로가기 버튼 (디자인엔 명시되어 있지 않지만 스크린 이탈을 위해 추가)
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
  }
});