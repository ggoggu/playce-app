// src/hooks/useEventLogic.ts
import { useState } from 'react';

export type EventCategory = '전체' | '전시' | '공연' | '팝업 / 플리마켓';

export interface EventData {
  id: string;
  category: EventCategory;
  status: string;
  location: string;
  title: string;
  subTitle: string;
  image: any; // 🌟 이미지 속성 추가
  details?: {
    moodTags: string[];
    companionTags: string[];
    previewTitle: string;
    previewDesc: string;
    period: string;
    price: string;
  };
}

// 🌟 정방형 카드 데이터 ('입는 존재' 하나만!)
const RECOMMENDED_EVENTS: EventData[] = [
  {
    id: 'rec_1',
    category: '전시',
    status: '진행중',
    location: '수원시립미술관 행궁 본관',
    title: '입는 존재',
    subTitle: 'Wearing Being:On the Matter of Clothing',
    image: require('../../assets/images/event/square_wearing.png'), // 🌟 이미지 연결
  },
];

// 🌟 세로형 포스터 카드 데이터 ('블랑 블랙 파노라마' 하나만!)
const HOT_EVENTS: EventData[] = [
  {
    id: 'hot_1',
    category: '전시',
    status: '진행중',
    location: '수원시립미술관',
    title: '블랑 블랙 파노라마',
    subTitle: 'Blanc Black Panorama',
    image: require('../../assets/images/event/poster_blanc.png'), // 🌟 이미지 연결
    details: {
      moodTags: ['# 세련된', '# 빛과_그림자', '# 대비', '# 몰입감 높은'],
      companionTags: ['# 혼자서_집중', '# 취향이_비슷한'],
      previewTitle: '흑백의 공간에서 강렬한 시각적 영감을 만나다.',
      previewDesc: '흑과 백의 강렬한 대비 속에서 피어나는 다채로운 예술 세계. 회화부터 영상까지 다양한 매체로 풀어낸 빛과 그림자의 향연을 감상해 보세요.',
      period: '2026-02-12 ~ 2027-03-01',
      price: '성인 : 4000원 / 청소년 : 2000원 어린이(만 7세 ~ 12세) : 1000원',
    }
  },
];

export const useEventLogic = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('전체');

  const handleCategorySelect = (category: EventCategory) => {
    setSelectedCategory(category);
  };

  const filteredRecommended = selectedCategory === '전체' 
    ? RECOMMENDED_EVENTS 
    : RECOMMENDED_EVENTS.filter(event => event.category === selectedCategory);

  const filteredHot = selectedCategory === '전체' 
    ? HOT_EVENTS 
    : HOT_EVENTS.filter(event => event.category === selectedCategory);

  return {
    selectedCategory,
    handleCategorySelect,
    recommendedEvents: filteredRecommended,
    hotEvents: filteredHot,
  };
};