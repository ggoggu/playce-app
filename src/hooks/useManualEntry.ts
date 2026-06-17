import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useBackendState } from '../context/BackendState';

export function useManualEntry(onClose: () => void) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { claimTag } = useBackendState();

  // 1. 등록 버튼 활성화 조건: 공백을 제외하고 1글자 이상 입력되었을 때
  // (추후 기획에 따라 '특정 자릿수 이상일 때' 등으로 쉽게 수정 가능합니다)
  const isSubmitEnabled = inputValue.trim().length > 0;

  // 2. 텍스트 입력 핸들러 (claim URL 또는 TAG-... 토큰 허용)
  const handleInputChange = (text: string) => {
    // QR URL과 TAG-... 토큰에 필요한 안전한 문자만 남깁니다.
    const filteredText = text.replace(/[^a-zA-Z0-9:/?=&._-]/g, '');
    setInputValue(filteredText);
  };

  // 3. 등록하기 버튼을 눌렀을 때의 동작
  const handleSubmit = async () => {
    if (!isSubmitEnabled) return;

    console.log(`수동 입력된 고유 코드: ${inputValue}`);

    try {
      const result = await claimTag(inputValue);
      Alert.alert('태그 등록 완료', `태그가 연결되었습니다.\nEPC: ${result.epc}`);
      setInputValue('');
      onClose();
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      Alert.alert('태그 등록 실패', message);
    }
  };

  return {
    inputValue,
    isSubmitEnabled,
    handleInputChange,
    handleSubmit,
  };
}
