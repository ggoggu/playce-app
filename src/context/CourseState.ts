// src/context/CourseState.ts
import { useState, useEffect } from 'react';

// 1. 테마 타입 정의
export type CourseTheme = 'history' | 'movie' | null;

// 2. 앱이 켜져 있는 동안 절대 초기화되지 않는 전역 상태
let globalActiveTheme: CourseTheme = null;
let globalRFIDPlace: string | null = null; // 🌟 추가: 인식된 장소 이름 (null이면 팝업이 닫힌 상태)
let globalCompletedNodes: number[] = [];

const listeners = new Set<() => void>();

// 상태가 바뀔 때마다 모든 화면에 알려주는 도우미 함수 (중복 제거용)
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useCourse = () => {
  const [activeTheme, setActiveTheme] = useState<CourseTheme>(globalActiveTheme);
  const [rfidPlace, setRfidPlace] = useState<string | null>(globalRFIDPlace); // 🌟 추가: RFID 상태 동기화
  const [completedNodes, setCompletedNodes] = useState<number[]>(globalCompletedNodes);

  // 화면이 바뀔 때마다 최신 상태를 동기화
  useEffect(() => {
    const listener = () => {
      setActiveTheme(globalActiveTheme);
      setRfidPlace(globalRFIDPlace); // 🌟 추가
      setCompletedNodes([...globalCompletedNodes]);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // 테마 정보를 받아 코스를 시작
  const startCourse = (theme: Exclude<CourseTheme, null>) => {
    globalActiveTheme = theme;
    notifyListeners();
  };

  // 코스 취소
  const cancelCourse = () => {
    globalActiveTheme = null;
    globalRFIDPlace = null; // 🌟 추가: 코스를 종료하면 RFID 팝업 상태도 안전하게 초기화
    globalCompletedNodes = [];
    notifyListeners();
  };

  const completeNode = (nodeIndex: number) => {
    if (!globalCompletedNodes.includes(nodeIndex)) {
      globalCompletedNodes.push(nodeIndex);
      notifyListeners();
    }
  };

  // ==========================================
  // 🌟 새롭게 추가된 RFID 비즈니스 로직
  // ==========================================

  // 특정 장소의 RFID 태그가 인식되었을 때 호출 (예: triggerRFID('화성행궁'))
  const triggerRFID = (placeName: string) => {
    globalRFIDPlace = placeName;
    notifyListeners();
  };

  // RFID 팝업을 닫을 때 호출
  const closeRFID = () => {
    globalRFIDPlace = null;
    notifyListeners();
  };

  return { 
    isCourseActive: activeTheme !== null,
    activeTheme,
    
    // 🌟 RFID 관련 반환값들
    rfidPlace,                             // 인식된 장소의 이름 (ex: '화성행궁')
    isRFIDDetected: globalRFIDPlace !== null, // 팝업을 띄워야 하는지 여부 (boolean)
    completedNodes,
    triggerRFID,                           // 태그 인식 트리거 함수
    closeRFID,                             // 팝업 닫기 함수

    startCourse, 
    cancelCourse,
    completeNode
  };
};