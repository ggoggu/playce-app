import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CATEGORY_LIST } from '../hooks/useMainPresenter';

export default function CategoryFilter({ selectedCategory, onSelectCategory }: any) {
  return (
    <View style={styles.tagContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.tagScroll}
        style={styles.scrollView}
      >
        {CATEGORY_LIST.map((category, index) => {
          const isActive = selectedCategory === category;
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.tagButton, isActive && styles.tagButtonActive]}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tagText, isActive && styles.tagTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* 타겟 버튼 */}
      <TouchableOpacity style={styles.targetButton} activeOpacity={0.8}>
        <View style={styles.targetInnerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 🌟 핵심 1: 부모 컨테이너에서 가로 중앙 정렬
    marginTop: 24,
    width: '100%',
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 1, // 🌟 핵심 2: 화면이 좁아지면 정상적으로 스크롤되도록 허용
  },
  tagScroll: {
    paddingHorizontal: 8, // 여백을 줄여서 타겟 버튼과의 간격을 자연스럽게 조절
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center', // 🌟 핵심 3: 스크롤 내부의 태그들도 중앙 정렬
  },
  tagButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  tagButtonActive: {
    backgroundColor: '#FFB826',
  },
  tagText: {
    fontSize: 9,
    color: '#FFB826',
    fontWeight: '500',
  },
  tagTextActive: {
    color: '#FFFFFF',
  },
  targetButton: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  targetInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});