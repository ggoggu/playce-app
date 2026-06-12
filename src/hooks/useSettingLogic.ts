// src/hooks/useSettingLogic.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { useCourse } from '../context/CourseState';

export const useSettingLogic = () => {
  // 🌟 1단계에서 제공해주신 전역 코스 상태 가져오기
  const { cancelCourse, isCourseActive } = useCourse();

  // --- 화면 상태(State) 관리 ---
  const [isProximityAlertOn, setIsProximityAlertOn] = useState(true);
  const [isHapticOn, setIsHapticOn] = useState(true);
  
  // (추가 확장성을 위한 텍스트 상태)
  const [selectedVoice, setSelectedVoice] = useState('보이스 1');
  const [selectedLanguage, setSelectedLanguage] = useState('한국어');

  // --- 기능(Action) 핸들러 ---
  
  // 1. 토글 스위치 기능
  const toggleProximityAlert = (value: boolean) => {
    setIsProximityAlertOn(value);
    // TODO: 실제 푸시 알림 권한 허용 로직 연동
  };

  const toggleHaptic = (value: boolean) => {
    setIsHapticOn(value);
    // TODO: 실제 기기 진동(Haptics) API 연동
  };

  // 2. 여정 초기화 기능 (실수 방지를 위한 확인창 추가)
  const handleResetCourse = () => {
    if (!isCourseActive) {
      Alert.alert('알림', '현재 진행 중인 여정이 없습니다.');
      return;
    }

    Alert.alert(
      '여정 초기화',
      '현재 진행 중인 모든 코스 기록이 삭제됩니다.\n정말 초기화하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '초기화', 
          style: 'destructive', 
          onPress: () => {
            cancelCourse(); // 🌟 전역 상태 초기화 함수 실행
            Alert.alert('완료', '여정이 안전하게 초기화되었습니다.');
          }
        }
      ]
    );
  };

  // 3. 자주 묻는 질문(FAQ) 이동 기능 (임시)
  const handleFAQ = () => {
    Alert.alert('안내', 'FAQ 페이지를 준비 중입니다.');
  };

  // 4. 화면(UI)으로 내보낼 데이터와 함수들
  return {
    isProximityAlertOn,
    isHapticOn,
    selectedVoice,
    selectedLanguage,
    toggleProximityAlert,
    toggleHaptic,
    handleResetCourse,
    handleFAQ,
  };
};