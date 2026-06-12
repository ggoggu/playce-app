import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// 🌟 데이터 및 상태 관리 훅 불러오기
import { useMainPresenter } from '../hooks/useMainPresenter';
import { useLocation } from '../hooks/useLocation';
import { useCourse } from '../context/CourseState';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { COURSE_DATA } from '../constants/CourseData';

// 🌟 UI 컴포넌트 불러오기
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import BottomNav from '../components/BottomNav';
import MapArea from '../components/MapArea'; 
import PlaceInfoCard from '../components/PlaceInfoCard'; // 새로 만든 카드 컴포넌트

export default function MainScreen() {
  // 1. 기존 메인 화면 로직
  const { selectedCategory, filteredPlaces, handleCategorySelect } = useMainPresenter();
  const { location, errorMsg } = useLocation();

  // 2. 🌟 코스 진행 상태 가져오기
  const { isCourseActive, activeTheme } = useCourse();
  const currentCourseNodes = (isCourseActive && activeTheme) ? COURSE_DATA[activeTheme].nodes : [];

  // 3. 🌟 마커 클릭 상태 관리 (새로 만든 훅)
  const { selectedNode, handleMarkerSelect, handleCloseCard } = useMapInteraction();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* 1. 지도 영역 */}
      <View style={styles.mapArea}>
        <MapArea 
          location={location} 
          errorMsg={errorMsg} 
          // 코스가 활성화되었다면 코스 노드를, 아니라면 일반 장소 데이터를 넘겨줍니다.
          filteredPlaces={isCourseActive ? [] : filteredPlaces} 
          courseNodes={currentCourseNodes} 
          onMarkerPress={handleMarkerSelect} // 마커 클릭 이벤트 연결
        />
      </View>

      {/* 2. 상단 UI (코스가 진행 중이 아닐 때만 헤더와 필터를 보여주기) */}
      {!isCourseActive && (
        <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
          <Header />
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />
        </SafeAreaView>
      )}

      {/* 3. 🌟 장소 상세 정보 팝업 카드 (선택된 노드가 있을 때만 나타남) */}
      <PlaceInfoCard 
        node={selectedNode} 
        onClose={handleCloseCard} 
      />

      {/* 4. 하단 네비게이션 바 */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF9E6' 
  },
  mapArea: {
    position: 'absolute', 
    top: 0,               
    left: 0,              
    right: 0,             
    bottom: 0,            
  },
  topOverlay: {
    paddingTop: 10,
  }
});