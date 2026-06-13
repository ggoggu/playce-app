import { useState } from 'react';
import { useRouter } from 'expo-router';

export function useManualEntry(onClose: () => void) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  // 1. 등록 버튼 활성화 조건: 공백을 제외하고 1글자 이상 입력되었을 때
  // (추후 기획에 따라 '특정 자릿수 이상일 때' 등으로 쉽게 수정 가능합니다)
  const isSubmitEnabled = inputValue.trim().length > 0;

  // 2. 텍스트 입력 핸들러 (영문과 숫자만 허용)
  const handleInputChange = (text: string) => {
    // 한글이나 특수문자가 입력되는 것을 방지하기 위해 필터링합니다.
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    setInputValue(filteredText);
  };

  // 3. 등록하기 버튼을 눌렀을 때의 동작
  const handleSubmit = () => {
    if (!isSubmitEnabled) return;

    console.log(`수동 입력된 고유 코드: ${inputValue}`);

    // 🌟 QR 스캔과 동일하게 전역 상태 업데이트 및 서버 데이터 전송을 처리합니다.
    alert(`태그 코드 [${inputValue}] 연동이 완료되었습니다!`);

    // 처리가 끝나면 입력창을 초기화하고 팝업을 닫습니다.
    setInputValue('');
    onClose();
    
    // QR 스캔 화면을 빠져나가 프로필 화면으로 복귀합니다.
    router.back();
  };

  return {
    inputValue,
    isSubmitEnabled,
    handleInputChange,
    handleSubmit,
  };
}