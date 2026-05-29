import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { useMainPresenter } from '../hooks/useMainPresenter';
import { useLocation } from '../hooks/useLocation';

import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import BottomNav from '../components/BottomNav';
// 🌟 방금 만든 MapArea를 불러옵니다! (웹인지 앱인지 알아서 판단해서 가져옵니다)
import MapArea from '../components/MapArea'; 

export default function MainScreen() {
  const { selectedCategory, activeTab, filteredPlaces, handleCategorySelect, handleTabSelect } = useMainPresenter();
  const { location, errorMsg } = useLocation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9E6" />
      
      <View style={styles.container}>
        <Header />
        
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />

        {/* 지도 영역 (컴포넌트로 분리 완료!) */}
        <View style={styles.mapArea}>
          <MapArea 
            location={location} 
            errorMsg={errorMsg} 
            filteredPlaces={filteredPlaces} 
          />
        </View>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9E6' },
  container: { flex: 1, backgroundColor: '#FFF9E6' },
  mapArea: {
    flex: 1,
  }
});