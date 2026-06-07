import { useState, useEffect } from 'react';

// 1. 테마 타입 정의
export type CourseTheme = 'history' | 'movie' | null;

// 2. 앱이 켜져 있는 동안 절대 초기화되지 않는 전역 상태
let globalActiveTheme: CourseTheme = null;
const listeners = new Set<() => void>();

export const useCourse = () => {
  const [activeTheme, setActiveTheme] = useState<CourseTheme>(globalActiveTheme);

  // 화면이 바뀔 때마다 최신 상태를 동기화
  useEffect(() => {
    const listener = () => setActiveTheme(globalActiveTheme);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // 🌟 테마 정보를 받아 코스를 시작 (history 또는 movie)
  const startCourse = (theme: Exclude<CourseTheme, null>) => {
    globalActiveTheme = theme;
    listeners.forEach(listener => listener());
  };

  // 🌟 코스 취소
  const cancelCourse = () => {
    globalActiveTheme = null;
    listeners.forEach(listener => listener());
  };

  return { 
    isCourseActive: activeTheme !== null, // 코스가 활성화 상태인지 확인
    activeTheme,                         // 현재 선택된 테마 (null | 'history' | 'movie')
    startCourse, 
    cancelCourse 
  };
};