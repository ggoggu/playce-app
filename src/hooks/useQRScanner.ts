import { useState, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useCourse } from '../context/CourseState';

export function useQRScanner() {
  // 1. 카메라 권한 상태 관리
  const [permission, requestPermission] = useCameraPermissions();
  
  // 2. 중복 스캔 방지 상태 (QR이 한 번 찍히면 잠시 스캔을 멈춥니다)
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  // 3. 화면 진입 시 권한이 없다면 사용자에게 권한 요청
  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  // 4. QR 코드가 성공적으로 스캔되었을 때 실행될 함수
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return; // 이미 스캔 처리 중이라면 무시합니다.
    setScanned(true);

    console.log(`스캔 완료! 타입: ${type}, 데이터: ${data}`);

    // 🌟 여기서 전역 상태 업데이트나 서버 데이터 전송을 처리합니다.
    // 임시로 알림창을 띄우고 이전 화면으로 돌아가도록 설정해 두었습니다.
    alert(`QR 코드 인식 완료!\n데이터: ${data}`);
    
    // 처리가 끝나면 프로필 화면으로 복귀
    router.back();
    
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