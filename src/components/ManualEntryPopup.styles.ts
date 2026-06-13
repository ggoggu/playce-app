import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // 1. 화면 전체를 덮는 어두운 반투명 배경
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 2. 하얀색 둥근 팝업창 뼈대
  popupContainer: {
    width: 315,
    height: 361,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 50, // 위쪽 일러스트레이션(SVG) 영역 고려
    paddingBottom: 30,
  },

  // 일러스트레이션 래퍼 (제공해주신 SVG가 들어갈 자리)
  imageWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },

  // 3. 직접 입력하기 타이틀
  title: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
    marginBottom: 30,
  },

  // 4. 입력창 및 안내문구 영역
  inputSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  // 회색 둥근 입력 박스
  inputBox: {
    width: 250,
    height: 68,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center', // 사용자가 입력할 때 글자가 가운데에서 시작되도록
    paddingHorizontal: 16,
  },
  
  // 안내 문구
  guideText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },

  // 5. 등록하기 버튼 래퍼
  buttonWrapper: {
    width: 250,
    height: 44,
  },
  
  // 비활성화 상태 (아무것도 입력하지 않았을 때)
  submitButton: {
    flex: 1,
    backgroundColor: '#CDCDCD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 활성화 상태 (글자를 입력했을 때)
  submitButtonActive: {
    backgroundColor: '#1BC5CC', 
  },
  
  submitButtonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  }
});