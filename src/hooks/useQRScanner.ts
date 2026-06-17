import { useState, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useBackendState } from '../context/BackendState';

export function useQRScanner() {
  // 1. 카메라 권한 상태 관리
  const [permission, requestPermission] = useCameraPermissions();
  
  // 2. 중복 스캔 방지 상태 (QR이 한 번 찍히면 잠시 스캔을 멈춥니다)
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { claimTag } = useBackendState();

  // 3. 화면 진입 시 권한이 없다면 사용자에게 권한 요청
  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  // 4. QR 코드가 성공적으로 스캔되었을 때 실행될 함수
  const handleBarcodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned) return; // 이미 스캔 처리 중이라면 무시합니다.
    setScanned(true);

    console.log(`스캔 완료! 타입: ${type}, 데이터: ${data}`);

    try {
      const result = await claimTag(data);
      Alert.alert('태그 등록 완료', `태그가 연결되었습니다.\nEPC: ${result.epc}`);
      router.back();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      Alert.alert('태그 등록 실패', message);
      setScanned(false);
    }
    
    // 계속해서 화면에 남아 스캔을 더 해야 한다면 아래 코드를 활용해 상태를 초기화할 수 있습니다.
    // setTimeout(() => setScanned(false), 2000); 
  };

  // 5. 수동 뒤로가기 동작
  const handleGoBack = () => {
    router.back();
  };

  return {
    hasPermission: permission?.granted ?? false,
    scanned,
    handleBarcodeScanned,
    handleGoBack
  };
}
