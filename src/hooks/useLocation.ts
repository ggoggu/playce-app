import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  // 🌟 핵심 1: 위치 정보가 멈출 때를 대비해 기본값(수원 화성)을 미리 세팅합니다.
  // 이렇게 하면 위치를 못 잡아도 일단 지도는 무조건 뜹니다!
  const [location, setLocation] = useState<any>({
    coords: { latitude: 37.288, longitude: 127.019 }
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // 1. 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 접근 권한이 필요합니다.');
        return;
      }

      try {
        // 🌟 핵심 2: 무한 로딩 방지! 
        // 폰이 마지막으로 기억하는 위치를 먼저 잽싸게 가져옵니다.
        let lastLoc = await Location.getLastKnownPositionAsync({});
        if (lastLoc) {
          setLocation(lastLoc);
        }
        
        // 그 다음, 최신 위치를 여유롭게 가져와서 업데이트합니다.
        let currentLoc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // 정밀도를 낮춰서 로딩 속도 향상
        });
        setLocation(currentLoc);
      } catch (error) {
        console.log("위치 가져오기 에러 (실내일 확률 높음):", error);
      }
    })();
  }, []);

  return { location, errorMsg };
}