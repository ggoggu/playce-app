// src/screens/EventScreen.tsx
import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // (실제 환경에서는 주석 해제)
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CrownIcon, HamburgerIcon, PaletteIcon, StoreIcon, TicketIcon } from '../components/icons/EventIcons';
import { colors } from '../styles/theme';
import { styles } from './EventScreen.styles';

// 🌟 3단계에서 만든 비즈니스 로직 훅 불러오기
import { EventCategory, EventData, useEventLogic } from '../hooks/useEventLogic';

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
const SquareEventCard = ({ title, subTitle, status, location, image, onPress }: any) => (
  <TouchableOpacity style={styles.squareCard} activeOpacity={0.9} onPress={onPress}>
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
const PosterEventCard = ({ title, subTitle, status, location, image, onPress }: any) => (
  <TouchableOpacity style={styles.posterCard} activeOpacity={0.9} onPress={onPress}>
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
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
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
              onPress={() => setSelectedEvent(event)}
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
              onPress={() => setSelectedEvent(event)}
            />
          ))}
        </ScrollView>

      </ScrollView>

      {/* 내 업적 플로팅 버튼 */}
      <TouchableOpacity style={styles.achievementButton} activeOpacity={0.8} onPress={() => router.push('/profile' as any)}>
        <CrownIcon color={colors.white} size={24} />
        <Text style={styles.achievementText}>내 업적</Text>
      </TouchableOpacity>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </SafeAreaView>
  );
}

const EventDetailModal = ({ event, onClose }: { event: EventData | null; onClose: () => void }) => {
  if (!event) return null;
  const details = event.details;

  return (
    <Modal visible={Boolean(event)} transparent animationType="fade" onRequestClose={onClose}>
      <View style={detailStyles.backdrop}>
        <View style={detailStyles.sheet}>
          <Image source={event.image} style={detailStyles.heroImage} resizeMode="cover" />
          <View style={detailStyles.statusTag}><Text style={detailStyles.statusText}>{event.status}</Text></View>
          <Text style={detailStyles.location}>{event.location}</Text>
          <Text style={detailStyles.title}>{event.title}</Text>
          <Text style={detailStyles.subtitle}>{event.subTitle}</Text>
          {details && (
            <>
              <View style={detailStyles.tagRow}>
                {[...details.moodTags, ...details.companionTags].map((tag) => (
                  <Text key={tag} style={detailStyles.tag}>{tag}</Text>
                ))}
              </View>
              <Text style={detailStyles.previewTitle}>{details.previewTitle}</Text>
              <Text style={detailStyles.previewDesc}>{details.previewDesc}</Text>
              <View style={detailStyles.infoGrid}>
                <View style={detailStyles.infoCell}>
                  <Text style={detailStyles.infoLabel}>기간</Text>
                  <Text style={detailStyles.infoValue}>{details.period}</Text>
                </View>
                <View style={detailStyles.infoCell}>
                  <Text style={detailStyles.infoLabel}>가격</Text>
                  <Text style={detailStyles.infoValue}>{details.price}</Text>
                </View>
              </View>
            </>
          )}
          <TouchableOpacity style={detailStyles.closeButton} onPress={onClose} activeOpacity={0.85}>
            <Text style={detailStyles.closeText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const detailStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  sheet: {
    borderRadius: 24,
    backgroundColor: '#191919',
    overflow: 'hidden',
    paddingBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 225,
  },
  statusTag: {
    alignSelf: 'flex-start',
    marginTop: 18,
    marginLeft: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#1BC5CC',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  location: {
    color: '#1BC5CC',
    fontSize: 12,
    fontWeight: '800',
    marginHorizontal: 18,
    marginTop: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginHorizontal: 18,
    marginTop: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    marginHorizontal: 18,
    marginTop: 4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginHorizontal: 18,
    marginTop: 18,
  },
  tag: {
    color: '#1BC5CC',
    backgroundColor: 'rgba(27,197,204,0.14)',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontSize: 11,
    fontWeight: '800',
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
    marginHorizontal: 18,
    marginTop: 18,
  },
  previewDesc: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    lineHeight: 18,
    marginHorizontal: 18,
    marginTop: 8,
  },
  infoGrid: {
    marginHorizontal: 18,
    marginTop: 16,
    gap: 8,
  },
  infoCell: {
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 12,
  },
  infoLabel: {
    color: '#1BC5CC',
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 4,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 17,
  },
  closeButton: {
    marginHorizontal: 18,
    marginTop: 18,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFB826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
