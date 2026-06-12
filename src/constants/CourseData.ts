// src/constants/CourseData.ts

export type CourseThemeType = 'history' | 'movie';

export interface CourseNode {
  id: number;               
  placeName: string;        
  description: string;      
  lat: number;              
  lng: number;              
  audioSource: any;         
  images: {
    bg: any;                
    building: any;
    marker : any;          
  };
  mapPosition: {            
    left: number;
    top: number;
  };
}

export interface ThemeCourseData {
  themeId: CourseThemeType;
  themeTitle: string;
  totalNodes: number;       
  nodes: CourseNode[];      
}

export const COURSE_DATA: Record<CourseThemeType, ThemeCourseData> = {
  history: {
    themeId: 'history',
    themeTitle: '역사테마',
    totalNodes: 5,
    nodes: [
      {
        id: 1,
        placeName: '화성행궁',
        description: '조선 정조 때 건립된 행궁으로, 왕이 지방 행차 시 머물던 곳입니다.', 
        lat: 37.2831, 
        lng: 127.0146, 
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/node_1_haenggung.png'), // 🌟 고유 이미지 적용
          marker: require('../../assets/images/course_history/node_1_haenggung_maker.png'),
        },
        mapPosition: { left: 71, top: 626 },
      },
      {
        id: 2,
        placeName: '화령전', 
        description: '정조의 초상화를 모시기 위해 순조 때 세워진 진전입니다.', 
        lat: 37.2838, 
        lng: 127.0140, 
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/node_2_hwaryeong.png'), // 🌟 고유 이미지 적용
          marker: require('../../assets/images/course_history/node_2_hwaryeong_maker.png'),
        },
        mapPosition: { left: 245, top: 626 },
      },
      {
        id: 3,
        placeName: '서장대', // 에셋 이름에 맞게 장소명 변경
        description: '수원 화성의 군사 지휘소로, 시야가 탁 트인 팔달산 정상에 위치합니다.', 
        lat: 37.2818, 
        lng: 127.0118, 
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/node_3_seojangdae.png'), // 🌟 고유 이미지 적용
          marker: require('../../assets/images/course_history/node_3_seojangdae_maker.png'),
        },
        mapPosition: { left: 165, top: 455 },
      },
      {
        id: 4,
        placeName: '서북각루', // 에셋 이름에 맞게 장소명 변경
        description: '수원 화성의 서북쪽에 위치한 감시용 군사 시설입니다.', 
        lat: 37.2865, 
        lng: 127.0125, 
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/node_4_seobuk.png'), // 🌟 고유 이미지 적용
          marker: require('../../assets/images/course_history/node_4_seobuk_maker.png'),
        },
        mapPosition: { left: 90, top: 289 },
      },
      {
        id: 5,
        placeName: '화서문', // 에셋 이름에 맞게 장소명 변경
        description: '수원 화성의 서쪽 문으로, 보물로 지정된 아름다운 건축물입니다.', 
        lat: 37.2875, 
        lng: 127.0119, 
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_history/node_5_hwaseomun.png'), // 🌟 고유 이미지 적용
          marker: require('../../assets/images/course_history/node_5_hwaseomun_maker.png'),
        },
        mapPosition: { left: 249, top: 289 },
      },
    ],
  },
  
  movie: {
    themeId: 'movie',
    themeTitle: '영화테마',
    totalNodes: 3, 
    nodes: [],
  },
};