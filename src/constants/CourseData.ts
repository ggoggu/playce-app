// src/constants/CourseData.ts

// 1. 사용할 테마의 종류를 정의합니다.
export type CourseThemeType = 'history' | 'movie';

// 2. 각 코스(노드)가 가져야 할 필수 데이터 규격을 정의합니다.
export interface CourseNode {
  id: number;               // 노드 번호 (1, 2, 3...)
  placeName: string;        // 장소 이름 (예: "화성행궁")
  audioSource: any;         // 재생할 오디오 파일 경로 (require)
  images: {
    bg: any;                // 일러스트 배경 이미지 (require)
    building: any;          // 일러스트 메인 건축물 이미지 (require)
  };
  mapPosition: {            // 지도에서 그려질 x, y 좌표
    left: number;
    top: number;
  };
}

// 3. 테마 전체가 가져야 할 데이터 규격을 정의합니다.
export interface ThemeCourseData {
  themeId: CourseThemeType;
  themeTitle: string;
  totalNodes: number;       // 🌟 이 테마의 총 코스 개수 (가변형 핵심)
  nodes: CourseNode[];      // 코스 정보가 담긴 배열
}

// 4. 실제 데이터를 매핑합니다. (이곳이 진실의 원천이 됩니다)
export const COURSE_DATA: Record<CourseThemeType, ThemeCourseData> = {
  history: {
    themeId: 'history',
    themeTitle: '역사테마',
    totalNodes: 5, // 역사 테마는 총 5개 코스
    nodes: [
      {
        id: 1,
        placeName: '화성행궁',
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/building_haenggung.png'),
        },
        // 피그마 CSS 기반 좌표
        mapPosition: { left: 71, top: 626 },
      },
      {
        id: 2,
        placeName: '화령전', // 임시 이름 (추후 변경 가능)
        // ⚠️ 테스트를 위해 임시로 1번 파일들을 연결해두었습니다. 나중에 2번 파일로 교체하세요!
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/building_haenggung.png'),
        },
        mapPosition: { left: 245, top: 626 },
      },
      {
        id: 3,
        placeName: '방화수류정',
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/building_haenggung.png'),
        },
        mapPosition: { left: 165, top: 455 },
      },
      {
        id: 4,
        placeName: '장안문',
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/building_haenggung.png'),
        },
        mapPosition: { left: 90, top: 289 },
      },
      {
        id: 5,
        placeName: '팔달문',
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/building_haenggung.png'),
        },
        mapPosition: { left: 249, top: 289 },
      },
    ],
  },
  
  // 영화 테마 예시 (나중에 코스가 3개라면 이렇게 유연하게 설정 가능합니다)
  movie: {
    themeId: 'movie',
    themeTitle: '영화테마',
    totalNodes: 3, // 영화 테마는 3개 코스
    nodes: [
      // ... 영화 테마 노드들 데이터
    ],
  },
};