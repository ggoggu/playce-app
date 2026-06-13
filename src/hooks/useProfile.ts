// src/hooks/useProfile.ts
import { useState, useRef, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

// 🌟 1. 전역 상태 및 데이터 불러오기
import { useCourse } from '../context/CourseState';
import { COURSE_DATA } from '../constants/CourseData'; 
import { useRouter } from 'expo-router';

export interface Badge {
  id: number | string;
  name: string;
  isAcquired: boolean;
  theme: string;
}

export function useProfile() {
  // 🌟 2. CourseState에서 실제 유저의 탐험 기록 가져오기
  const { completedNodes, progressPercent } = useCourse();
  const router = useRouter();

  // 기본 유저 정보 상태 (닉네임 등은 추후 로그인 API 연동 시 업데이트)
  const [userInfo, setUserInfo] = useState({
    nickname: '행궁체험사랑',
    isTagConnected: true,
    playTimeMinutes: 45, // 체류 시간 (앱 접속 후 타이머로 추후 구현 가능)
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '90%'], []);

  // 🌟 3. 모든 테마의 장소(노드) 데이터를 뒤져서 배지 목록 동적 생성
  const badges = useMemo(() => {
    const allBadges: Badge[] = [];
    
    // COURSE_DATA에 있는 모든 테마('history', 'movie' 등)를 순회
    Object.keys(COURSE_DATA).forEach(themeKey => {
      const themeData = COURSE_DATA[themeKey as keyof typeof COURSE_DATA];
      
      themeData.nodes.forEach(node => {
        allBadges.push({
          id: node.id,
          name: node.placeName, // CourseData 구조의 장소명
          isAcquired: completedNodes.includes(node.id), // 전역 상태에 이 노드ID가 있으면 획득!
          theme: themeData.themeTitle,
        });
      });
    });
    
    return allBadges;
  }, [completedNodes]); // completedNodes가 변할 때만 배지 목록을 재계산

  // 획득한 배지 개수 
  const acquiredBadgeCount = badges.filter(b => b.isAcquired).length;

  // --- [이벤트 핸들러] ---
  const handleEditProfile = () => {
    console.log("내 정보 수정 페이지로 이동");
  };

  const handleScanQR = () => {
    router.push('/qr-scan' as any);
  };

  const handleDeleteTag = () => {
    console.log("태그 삭제 로직 실행");
  };

  return {
    userInfo: {
      ...userInfo,
      progressRate: progressPercent || 0, // 🌟 전역 진행률(% )을 View로 전달
    },
    badges,
    acquiredBadgeCount,
    bottomSheetRef,
    snapPoints,
    handleEditProfile,
    handleScanQR,
    handleDeleteTag,
  };
}