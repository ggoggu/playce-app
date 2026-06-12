import { useState, useEffect } from 'react';
import { CourseNode } from '../constants/CourseData';
import { DirectionService, Coordinate } from '../services/DirectionService';

export function useCourseDirections(courseNodes: CourseNode[]) {
  // 🌟 최종적으로 화면에 그려질 전체 경로 선의 좌표들
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  // 🌟 경로를 계산(API 통신) 중인지 알려주는 로딩 상태
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    async function fetchEntireRoute() {
      // 길을 찾으려면 최소 2개 이상의 노드가 필요합니다.
      if (!courseNodes || courseNodes.length < 2) {
        setRouteCoordinates([]);
        return;
      }

      setIsRouteLoading(true);
      const allPaths: Coordinate[] = [];

      try {
        // 코스 순서대로 하나씩 짚어가며 길찾기를 요청합니다.
        for (let i = 0; i < courseNodes.length - 1; i++) {
          const start = courseNodes[i];
          const end = courseNodes[i + 1];
          
          // Service Layer 호출
          const pathSegment = await DirectionService.getWalkingRoute(start, end);
          
          // 찾아온 경로를 전체 경로 배열에 이어 붙입니다.
          allPaths.push(...pathSegment);
        }

        setRouteCoordinates(allPaths);
      } catch (error) {
        console.error('전체 경로 연동 중 에러 발생:', error);
      } finally {
        setIsRouteLoading(false); // 성공하든 실패하든 로딩은 끝냅니다.
      }
    }

    // 코스 노드 데이터가 들어오거나 변경될 때만 실행됩니다.
    fetchEntireRoute();
  }, [courseNodes]); 

  return { routeCoordinates, isRouteLoading };
}