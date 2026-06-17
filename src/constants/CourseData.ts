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
  badgeImage?: any;
  detailTitle?: string;
  detailDescription?: string;
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
        badgeImage: require('../../assets/images/badges/badge_hwasung_haenggung.png'),
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
        badgeImage: require('../../assets/images/badges/badge_hwaryeongjeon.png'),
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
        badgeImage: require('../../assets/images/badges/badge_seojangdae.png'),
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
        badgeImage: require('../../assets/images/badges/badge_seobukgakru.png'),
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
        badgeImage: require('../../assets/images/badges/badge_hwaseomun.png'),
        mapPosition: { left: 249, top: 289 },
      },
    ],
  },
  
  movie: {
    themeId: 'movie',
    themeTitle: '영화 & 드라마',
    totalNodes: 6, 
    nodes: [
      {
        id: 1,
        placeName: '이태원 클라쓰',
        description: '행궁동 골목에서 다시 만나는 청춘의 에너지와 드라마 속 장면을 따라가요.',
        lat: 37.2832,
        lng: 127.0145,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_1_itaewon.png'),
          marker: require('../../assets/images/course_movie/node_1_itaewon.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_itaewon_class.png'),
        mapPosition: { left: 71, top: 626 },
      },
      {
        id: 2,
        placeName: '선재 업고 튀어',
        description: '시간을 건너온 마음처럼, 행궁동의 포토 스팟을 가볍게 이어 걸어요.',
        lat: 37.2841,
        lng: 127.0142,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_2_lovely_runner.png'),
          marker: require('../../assets/images/course_movie/node_2_lovely_runner.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_lovely_runner.png'),
        mapPosition: { left: 245, top: 626 },
      },
      {
        id: 3,
        placeName: '이상한 변호사 우영우',
        description: '선명한 캐릭터처럼 오래 남는 장면들을 행궁동 곳곳에서 찾아봐요.',
        lat: 37.2858,
        lng: 127.0128,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_4_attorney_woo.png'),
          marker: require('../../assets/images/course_movie/node_4_attorney_woo.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_attorney_woo.png'),
        mapPosition: { left: 245, top: 455 },
      },
      {
        id: 4,
        placeName: '그 해 우리는',
        description: '다정한 기억이 남는 길을 따라 산책하며 촬영지 분위기를 느껴보세요.',
        lat: 37.2849,
        lng: 127.0134,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_3_beloved_summer.png'),
          marker: require('../../assets/images/course_movie/node_3_beloved_summer.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_beloved_summer.png'),
        mapPosition: { left: 90, top: 455 },
      },
      {
        id: 5,
        placeName: '전우치',
        description: '전통과 판타지가 겹치는 길 위에서 영화 속 장면을 떠올려보세요.',
        lat: 37.2864,
        lng: 127.0121,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_5_jeon_woochi.png'),
          marker: require('../../assets/images/course_movie/node_5_jeon_woochi.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_jeon_woochi.png'),
        mapPosition: { left: 90, top: 289 },
      },
      {
        id: 6,
        placeName: '클래식',
        description: '오래된 편지 같은 풍경을 따라 영화의 감성을 천천히 완성해요.',
        lat: 37.2872,
        lng: 127.0117,
        audioSource: require('../../assets/audio/history/1.mp3'),
        images: {
          bg: require('../../assets/images/course_history/bg_illust_haenggung.png'),
          building: require('../../assets/images/course_movie/node_6_classic.png'),
          marker: require('../../assets/images/course_movie/node_6_classic.png'),
        },
        badgeImage: require('../../assets/images/badges/badge_classic.png'),
        mapPosition: { left: 245, top: 289 },
      },
    ],
  },
};
