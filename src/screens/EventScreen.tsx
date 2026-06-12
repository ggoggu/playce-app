// src/screens/EventScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // (실제 환경에서는 주석 해제)
import { styles } from './EventScreen.styles';
import { colors } from '../styles/theme';
import BottomNav from '../components/BottomNav';
import { HamburgerIcon, PaletteIcon, TicketIcon, StoreIcon, CrownIcon } from '../components/icons/EventIcons';
import { LinearGradient } from 'expo-linear-gradient';

// 🌟 3단계에서 만든 비즈니스 로직 훅 불러오기
import { useEventLogic, EventCategory } from '../hooks/useEventLogic';

// --- 재사용 UI 컴포넌트 ---

// 1. 카테고리 뱃지
const CategoryBadge = ({ 
  label, isActive, icon: Icon, onPress 
}: { 
  label: string; isActive?: boolean; icon: any; onPress: () => void 
}) => {
  const iconColor = isActive ? colors.white : colors.point;
  return (
    <TouchableOpacity 
      style={[styles.filterBadge, isActive && styles.filterBadgeActive]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {Icon && <Icon color={iconColor} size={12} />}
      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

// 2. 정방형 이벤트 카드 (이런곳도 가보고 싶어요!)
const SquareEventCard = ({ title, subTitle, status, location, image }: any) => (
  <TouchableOpacity style={styles.squareCard} activeOpacity={0.9}>
    <Image source={image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.7)']} // 🌟 위는 투명, 아래는 어둡게
      style={styles.cardOverlay}
    >
      <View style={styles.statusTag}><Text style={styles.statusText}>{status}</Text></View>
      <Text style={{ color: colors.point, fontSize: 10, marginBottom: 2 }}>{location}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subTitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// 3. 포스터 이벤트 카드 (여기가 제일 핫하대요!)
const PosterEventCard = ({ title, subTitle, status, location, image }: any) => (
  <TouchableOpacity style={styles.posterCard} activeOpacity={0.9}>
    <Image source={image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']} // 🌟 위는 투명, 아래는 어둡게
      style={styles.cardOverlay}
    >
      <View style={[styles.statusTag, { alignSelf: 'flex-end' }]}><Text style={styles.statusText}>{status}</Text></View>
      <Text style={{ color: colors.point, fontSize: 10, textAlign: 'right', marginBottom: 2 }}>{location}</Text>
      <Text style={styles.posterTitle}>{title}</Text>
      <Text style={[styles.cardSub, { textAlign: 'right' }]}>{subTitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// --- 카테고리 매핑용 배열 ---
const CATEGORY_TABS: { label: EventCategory; icon: any }[] = [
  { label: '전체', icon: HamburgerIcon },
  { label: '전시', icon: PaletteIcon },
  { label: '공연', icon: TicketIcon },
  { label: '팝업 / 플리마켓', icon: StoreIcon },
];

// --- 메인 화면 컨테이너 ---
export default function EventScreen() {
  // 🌟 분리된 로직과 데이터 가져오기
  const {
    selectedCategory,
    handleCategorySelect,
    recommendedEvents,
    hotEvents,
  } = useEventLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 배경 그라데이션 (expo-linear-gradient 사용 권장) */}
      <LinearGradient
        colors={[colors.primary, 'rgba(255, 255, 255, 0)']} // 주황색 -> 투명
        style={styles.topBackground}
      />

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.logoText}>PLAYCE</Text>

        {/* 1. 필터 영역 (로직 연동 완료) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {CATEGORY_TABS.map((tab) => (
            <CategoryBadge 
              key={tab.label}
              label={tab.label} 
              icon={tab.icon}
              isActive={selectedCategory === tab.label}
              onPress={() => handleCategorySelect(tab.label)}
            />
          ))}
        </ScrollView>
        <Text style={styles.filterHint}>카드를 뒤집어서 상세정보를 확인하세요!</Text>

        {/* 2. 첫 번째 섹션: 추천 이벤트 */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>사용자님과{'\n'}이런곳도 가보고 싶어요!</Text>
          <Text style={styles.sectionSubTitle}>카테고리별로 행궁동의 이벤트들을 알려드려요</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {/* 🌟 훅에서 필터링된 배열을 매핑하여 렌더링 */}
          {recommendedEvents.map((event) => (
            <SquareEventCard 
              key={event.id} 
              title={event.title} 
              subTitle={event.subTitle} 
              status={event.status}
              location={event.location}
              image={event.image}
            />
          ))}
        </ScrollView>

        {/* 3. 두 번째 섹션: 핫 이벤트 */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>지금 행궁동에서는{'\n'}여기가 제일 핫하대요!</Text>
          <Text style={styles.sectionSubTitle}>요즘 행궁동에서 떠오르는 핫한 이벤트들을 만나보세요!</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {/* 🌟 훅에서 필터링된 배열을 매핑하여 렌더링 */}
          {hotEvents.map((event) => (
            <PosterEventCard 
              key={event.id} 
              title={event.title} 
              subTitle={event.subTitle} 
              status={event.status}
              location={event.location}
              image={event.image}
            />
          ))}
        </ScrollView>

      </ScrollView>

      {/* 내 업적 플로팅 버튼 */}
      <TouchableOpacity style={styles.achievementButton} activeOpacity={0.8}>
        <CrownIcon color={colors.white} size={24} />
        <Text style={styles.achievementText}>내 업적</Text>
      </TouchableOpacity>

      <BottomNav />
    </SafeAreaView>
  );
}