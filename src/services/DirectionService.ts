import { CourseNode } from '../constants/CourseData';

// 🌟 지도에 선을 그리기 위해 필요한 최소한의 좌표 규격
export interface Coordinate {
  latitude: number;
  longitude: number;
}

export const DirectionService = {
  /**
   * 출발지와 도착지를 받아 도보 경로의 상세 좌표 배열을 반환합니다.
   */
  async getWalkingRoute(startNode: CourseNode, endNode: CourseNode): Promise<Coordinate[]> {
    try {
      // 🚨 [실제 운영 환경] 카카오 모빌리티, TMAP, 네이버 등의 길찾기 API 연동 위치
      // const REST_API_KEY = 'YOUR_API_KEY';
      // const url = `https://apis-navi.kakaomobility.com/v1/directions?...`;
      // const response = await fetch(url, { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } });
      // const data = await response.json();
      // return parseRouteData(data); // 응답받은 데이터를 Coordinate[] 형태로 가공하여 반환

      // 🛠️ [현재 테스트 환경] API 연동 전이므로, 노드 사이를 이어주는 가상의 곡선 경로를 생성해 반환합니다.
      return generateMockRoute(startNode, endNode);
    } catch (error) {
      console.error('경로를 가져오는데 실패했습니다:', error);
      return [];
    }
  }
};

/**
 * 🛠️ 테스트용 가짜 경로 생성기 (실제 API 연동 시 이 함수는 삭제하시면 됩니다)
 * 직선이 아닌 약간의 곡선을 주어 지도에서 경로가 예쁘게 보이도록 임의 계산합니다.
 */
function generateMockRoute(start: CourseNode, end: CourseNode): Coordinate[] {
  const points: Coordinate[] = [];
  const steps = 15; // 15개의 점으로 쪼개서 선을 만듭니다
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = start.lat + (end.lat - start.lat) * t + Math.sin(t * Math.PI) * 0.0005;
    const lng = start.lng + (end.lng - start.lng) * t + Math.cos(t * Math.PI) * 0.0005;
    points.push({ latitude: lat, longitude: lng });
  }
  return points;
}