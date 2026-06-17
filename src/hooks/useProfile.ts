// src/hooks/useProfile.ts
import { useEffect, useState, useRef, useMemo } from 'react';
import type BottomSheet from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';

// 🌟 1. 전역 상태 및 데이터 불러오기
import { useCourse } from '../context/CourseState';
import { COURSE_DATA } from '../constants/CourseData'; 
import { useRouter } from 'expo-router';
import { useBackendState } from '../context/BackendState';

const NICKNAME_KEY = 'playce.nickname';
const DEFAULT_NICKNAME = '행궁체험사랑';

export interface Badge {
  id: number | string;
  name: string;
  isAcquired: boolean;
  theme: string;
  image?: any;
  description: string;
}

export function useProfile() {
  const { completedBadgeKeys, overallProgressPercent } = useCourse();
  const { appInstanceId, tagBinding, gameplayProgress, registrationStatus, lastError } = useBackendState();
  const router = useRouter();

  // 기본 유저 정보 상태 (닉네임 등은 추후 로그인 API 연동 시 업데이트)
  const [nickname, setNickname] = useState(DEFAULT_NICKNAME);
  const [isTagHidden, setIsTagHidden] = useState(false);
  const [userInfo] = useState({
    playTimeMinutes: 45, // 체류 시간 (앱 접속 후 타이머로 추후 구현 가능)
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '90%'], []);

  useEffect(() => {
    let mounted = true;
    SecureStore.getItemAsync(NICKNAME_KEY)
      .then(storedNickname => {
        if (mounted && storedNickname) {
          setNickname(storedNickname);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  const badges = useMemo(() => {
    const allBadges: Badge[] = [];
    
    Object.keys(COURSE_DATA).forEach(themeKey => {
      const themeData = COURSE_DATA[themeKey as keyof typeof COURSE_DATA];
      
      themeData.nodes.forEach(node => {
        allBadges.push({
          id: `${themeData.themeId}-${node.id}`,
          name: node.placeName,
          isAcquired: completedBadgeKeys.includes(`${themeData.themeId}:${node.id}`),
          theme: themeData.themeTitle,
          image: node.badgeImage,
          description: node.description,
        });
      });
    });
    
    return allBadges;
  }, [completedBadgeKeys]);

  // 획득한 배지 개수 
  const acquiredBadgeCount = badges.filter(b => b.isAcquired).length;

  // --- [이벤트 핸들러] ---
  const handleEditProfile = (nextNickname: string) => {
    const trimmed = nextNickname.trim();
    if (trimmed) {
      setNickname(trimmed);
      void SecureStore.setItemAsync(NICKNAME_KEY, trimmed);
    }
  };

  const handleScanQR = () => {
    router.push('/qr-scan' as any);
  };

  const handleDeleteTag = () => {
    setIsTagHidden(true);
  };

  return {
    userInfo: {
      ...userInfo,
      nickname,
      appInstanceId,
      epc: isTagHidden ? '' : tagBinding?.epc ?? '',
      isTagConnected: !isTagHidden && Boolean(tagBinding),
      registrationStatus: isTagHidden ? '태그 삭제됨' : registrationStatus,
      registrationError: lastError,
      progressRate: gameplayProgress?.regionalProgressPercent ?? overallProgressPercent ?? 0,
    },
    tagBinding,
    registrationStatus,
    badges,
    acquiredBadgeCount,
    bottomSheetRef,
    snapPoints,
    handleEditProfile,
    handleScanQR,
    handleDeleteTag,
  };
}
