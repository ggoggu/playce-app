import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { useMainPresenter } from '../hooks/useMainPresenter';
import { useLocation } from '../hooks/useLocation';

import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import BottomNav from '../components/BottomNav';
import MapArea from '../components/MapArea'; 

export default function MainScreen() {
  const { selectedCategory, activeTab, filteredPlaces, handleCategorySelect, handleTabSelect } = useMainPresenter();
  const { location, errorMsg } = useLocation();

  return (
    <View style={styles.container}>
      {/* 상태바(시계, 배터리) 영역을 투명하게 만들어 지도가 끝까지 올라가게 합니다 */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* 1. 지도를 배경으로 쫙 깔기 (제일 먼저 렌더링해야 맨 밑에 깔립니다) */}
      <View style={styles.mapArea}>
        <MapArea 
          location={location} 
          errorMsg={errorMsg} 
          filteredPlaces={filteredPlaces} 
        />
      </View>

      {/* 2. 지도 위에 둥둥 떠 있을 상단 UI들 (헤더, 카테고리) */}
      {/* pointerEvents="box-none"을 넣어야 빈 공간을 터치했을 때 지도가 움직입니다! */}
      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        <Header />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />
      </SafeAreaView>

      {/* 3. 하단 바 (자체적으로 띄워져 있도록 설계됨) */}
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
    position: 'absolute', // 지도를 일반적인 흐름에서 빼서
    top: 0,               // 화면 맨 위부터
    left: 0,              // 왼쪽
    right: 0,             // 오른쪽
    bottom: 0,            // 맨 아래까지 꽉 채웁니다!
  },
  topOverlay: {
    // 안드로이드 노치(카메라 파인 곳)를 피해 안전하게 띄우기 위함
    paddingTop: 10,
  }
});