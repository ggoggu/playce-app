// src/hooks/useProfile.ts
import { useState, useRef, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export function useProfile() {
  // --- [State] 유저 정보 ---
  const [userInfo, setUserInfo] = useState({
    nickname: '행궁체험사랑',
    isTagConnected: true, // 태그 연결 여부 상태
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['45%', '90%'], []);

  // --- [Event Handlers] 버튼 클릭 이벤트 ---
  const handleEditProfile = () => {
    console.log("내 정보 수정 페이지로 이동");
  };

  const handleScanQR = () => {
    console.log("QR 스캔 카메라 실행");
  };

  const handleDeleteTag = () => {
    console.log("태그 삭제 로직 실행");
  };

  return {
    userInfo,
    handleEditProfile,
    handleScanQR,
    handleDeleteTag,
    bottomSheetRef,
    snapPoints,
  };
}