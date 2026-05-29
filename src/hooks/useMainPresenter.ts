import { useState } from 'react';

// [Model] 변하지 않는 정적 데이터
export const CATEGORY_LIST = ['전체', '음식점', '카페', '관광지'];
export const BOTTOM_NAV_LIST = ['홈', '코스선택', '이벤트', '프로필', '환경설정'];

// 🌟 새로 추가된 더미 데이터 (식당/관광지 목록)
// 실제 앱에서는 이 데이터를 서버(API)에서 받아오게 됩니다.
const DUMMY_PLACES = [
  { id: 1, name: '방화수류정', category: '관광지', lat: 37.288, lng: 127.019 },
  { id: 2, name: '연포갈비', category: '음식점', lat: 37.287, lng: 127.018 },
  { id: 3, name: '별이네', category: '음식점', lat: 37.289, lng: 127.017 },
  { id: 4, name: '정지영 커피', category: '카페', lat: 37.286, lng: 127.016 },
];

// [Presenter] 상태 관리 및 비즈니스 로직
export function useMainPresenter() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [activeTab, setActiveTab] = useState('홈');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  // 🌟 선택된 카테고리에 맞춰 장소를 필터링하는 로직
  const filteredPlaces = DUMMY_PLACES.filter(place => {
    if (selectedCategory === '전체') return true;
    return place.category === selectedCategory;
  });

  return {
    selectedCategory,
    activeTab,
    filteredPlaces, // 필터링된 데이터 반환
    handleCategorySelect,
    handleTabSelect,
  };
}