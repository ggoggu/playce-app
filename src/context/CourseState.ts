// src/context/CourseState.ts
import { useState, useEffect } from 'react';
import { COURSE_DATA, CourseThemeType } from '../constants/CourseData'; // 🌟 1단계에서 만든 데이터와 타입 임포트

export type CourseTheme = CourseThemeType | null;

// 앱 전체에서 공유할 글로벌 변수 (진실의 원천)
let globalActiveTheme: CourseTheme = null;
let globalRFIDPlace: string | null = null;
let globalCompletedNodes: number[] = []; 
let globalCurrentNodeIndex: number | null = null; // 🌟 추가: 현재 사용자가 진입한 오디오 코스 번호

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useCourse = () => {
  const [activeTheme, setActiveTheme] = useState<CourseTheme>(globalActiveTheme);
  const [rfidPlace, setRfidPlace] = useState<string | null>(globalRFIDPlace);
  const [completedNodes, setCompletedNodes] = useState<number[]>(globalCompletedNodes);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number | null>(globalCurrentNodeIndex); // 🌟 추가

  useEffect(() => {
    const listener = () => {
      setActiveTheme(globalActiveTheme);
      setRfidPlace(globalRFIDPlace);
      setCompletedNodes([...globalCompletedNodes]);
      setCurrentNodeIndex(globalCurrentNodeIndex); // 🌟 추가
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // 코스 여정 시작
  const startCourse = (theme: Exclude<CourseTheme, null>) => {
    globalActiveTheme = theme;
    globalCompletedNodes = []; 
    globalCurrentNodeIndex = null;
    notifyListeners();
  };

  // 코스 여정 완전히 취소 (초기화)
  const cancelCourse = () => {
    globalActiveTheme = null;
    globalRFIDPlace = null;
    globalCompletedNodes = [];
    globalCurrentNodeIndex = null;
    notifyListeners();
  };

  // RFID 태그 인식되었을 때
  const triggerRFID = (placeName: string) => {
    globalRFIDPlace = placeName;
    notifyListeners();
  };

  // RFID 팝업 닫기
  const closeRFID = () => {
    globalRFIDPlace = null;
    notifyListeners();
  };

  // 🌟 추가: 현재 재생/진입할 노드 번호를 전역에 설정하는 함수
  const setCurrentNode = (nodeIndex: number | null) => {
    globalCurrentNodeIndex = nodeIndex;
    notifyListeners();
  };

  // 특정 코스 완료 처리
  const completeNode = (nodeIndex: number) => {
    if (!globalCompletedNodes.includes(nodeIndex)) {
      globalCompletedNodes.push(nodeIndex);
      notifyListeners();
    }
  };

  // 🌟 [핵심 변경] 선택한 테마의 실제 totalNodes를 기반으로 진행률(%)을 동적 계산합니다.
  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : null;
  const totalNodes = currentThemeData ? currentThemeData.totalNodes : 1; // 0 나누기 방지 기본값 1
  const progressPercent = currentThemeData 
    ? Math.round((completedNodes.length / totalNodes) * 100) 
    : 0;

  return { 
    isCourseActive: activeTheme !== null,
    activeTheme,
    rfidPlace,
    isRFIDDetected: globalRFIDPlace !== null,
    completedNodes,
    currentNodeIndex, // 🌟 현재 보고 있는 노드 번호 반환
    progressPercent,  // 🌟 가변형으로 계산된 진행률(%) 반환
    triggerRFID,
    closeRFID,
    startCourse, 
    cancelCourse,
    setCurrentNode,   // 🌟 노드 설정 함수 반환
    completeNode
  };
};