import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useCourse } from '../context/CourseState';
import CourseProgressScreen from './CourseProgressScreen';
import BottomNav from '../components/BottomNav';
import CoursePopup from '../components/CoursePopup';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 294;
const CARD_GAP = 28; // 피그마 gap: 28px 반영
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export default function CourseScreen() {
  const { isCourseActive, startCourse } = useCourse();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', path: '', image: null, themeId: '' });

  // 🌟 피그마 데이터 기반 테마 설정
  const COURSES = {
    history: {
      id: 'history',
      title: '역사테마',
      desc: '행궁동에 얽힌 역사 이야기들과 함께 문화재를 구경해요!',
      path: '화성행궁 - 화령전 - 서장대\n서북각루 - 화서문 & 서북공심돈',
      bgImage: require('../../assets/images/course_bg_1.png'), // 카드 배경
      mainImage: require('../../assets/images/theme_history_main.png'), // 카드 안 일러스트
      popupImage: require('../../assets/images/theme_history_popup.png'), // 팝업창 이미지
    },
    movie: {
      id: 'movie',
      title: '영화 & 드라마',
      desc: '행궁동에서 영화 & 드라마 속 명장면을 찾아보세요!',
      path: '행궁동 벽화마을 - 드라마 촬영지 1\n명장면 카페거리 - 영화 촬영지 2',
      bgImage: require('../../assets/images/course_bg_1.png'), 
      mainImage: require('../../assets/images/theme_history_main.png'), 
      popupImage: require('../../assets/images/theme_history_popup.png'),
    }
  };

  const openPopup = (themeId: 'history' | 'movie') => {
    const selected = COURSES[themeId];
    setPopupData({
      title: selected.title,
      path: selected.path,
      image: selected.popupImage,
      themeId: selected.id
    });
    setPopupVisible(true);
  };

  const handleStartCourse = () => {
    setPopupVisible(false);
    if (popupData.themeId) {
      startCourse(popupData.themeId as 'history' | 'movie');
    }
  };

  if (isCourseActive) {
    return <CourseProgressScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* 상단 헤더 (PLAYCE + Hamburger) */}
      <View style={styles.header}>
        <Text style={styles.logoText}>PLAYCE</Text>
        <TouchableOpacity style={styles.hamburgerButton}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </View>

      {/* 타이틀 영역 */}
      <View style={styles.titleArea}>
        <Text style={styles.mainTitle}>
          <Text style={styles.pointText}>행궁체험사랑</Text>님,{"\n"}어떤 코스로 안내드릴까요?
        </Text>
        <Text style={styles.subTitle}>
          행궁체험사랑님의 취향에 맞는 코스를 선택해,{"\n"}나만의 관광가이드와 함께하세요!
        </Text>
      </View>

      {/* 카드 슬라이더 */}
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
        >
          {/* 역사 테마 카드 */}
          <CardItem 
            course={COURSES.history} 
            courseNum="1" 
            onPress={() => openPopup('history')} 
          />
          {/* 영화 드라마 테마 카드 */}
          <CardItem 
            course={COURSES.movie} 
            courseNum="2" 
            onPress={() => openPopup('movie')} 
          />
        </ScrollView>
      </View>

      {/* 하단 바 */}
      <BottomNav />

      {/* 팝업창 */}
      <CoursePopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onStart={handleStartCourse}
        title={popupData.title}
        coursePath={popupData.path}
        imageSource={popupData.image}
      />
    </SafeAreaView>
  );
}

// 🃏 개별 카드 컴포넌트 (내부 레이어 구조 복잡화)
const CardItem = ({ course, courseNum, onPress }: any) => (
  <View style={styles.cardWrapper}>
    <ImageBackground source={course.bgImage} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
      
      {/* 1. 카드 내부 일러스트 이미지 (피그마 image 118 위치 반영) */}
      <Image source={course.mainImage} style={styles.cardIllustration} resizeMode="contain" />

      {/* 2. 상단 텍스트 정보 */}
      <View style={styles.cardContentTop}>
        <View style={styles.tag}>
          <View style={styles.tagIcon} />
          <Text style={styles.tagText}>코스{courseNum}</Text>
        </View>
        <View style={styles.cardTextGroup}>
          <Text style={styles.cardTitle}>{course.title}</Text>
          <Text style={styles.cardDesc}>{course.desc}</Text>
        </View>
      </View>

      {/* 3. 시작하기 버튼 */}
      <TouchableOpacity style={styles.startButton} onPress={onPress} activeOpacity={0.9}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9E6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 38,
    marginTop: 30, // 피그마 top 79px 보정
    height: 34,
  },
  logoText: {
    fontFamily: 'Rammetto One',
    fontSize: 20,
    color: '#FFB826',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  hamburgerButton: { width: 24, height: 24, justifyContent: 'space-evenly', alignItems: 'center' },
  hamburgerLine: { width: 18, height: 2, backgroundColor: '#8A8A8A' },
  
  titleArea: { paddingHorizontal: 38, marginTop: 34 },
  mainTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: '#000000',
  },
  pointText: { color: '#1BC5CC' },
  subTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#8A8A8A',
    marginTop: 19,
  },

  sliderContainer: { marginTop: 28, height: 395 },
  scrollContent: { paddingHorizontal: SIDE_PADDING, gap: 28 },
  
  cardWrapper: {
    width: 294,
    height: 395,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    // 그림자는 Wrapper에 부여
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardBg: { flex: 1, padding: 22, justifyContent: 'space-between' },
  
  // 카드 안의 캐릭터 일러스트 (피그마 수치 반영)
  cardIllustration: {
    position: 'absolute',
    width: 320,
    height: 237,
    left: -13, // 피그마 상 중심 오정 보정
    top: 116,
  },

  cardContentTop: { gap: 14 },
  tag: {
    width: 52,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  tagIcon: { width: 11.5, height: 10, backgroundColor: '#FFB826', borderRadius: 2 },
  tagText: { fontSize: 10, fontWeight: '600', color: 'rgba(0, 0, 0, 0.7)' },
  
  cardTextGroup: { gap: 12 },
  cardTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  cardDesc: { fontSize: 10, fontWeight: '400', color: '#E0E0E0', lineHeight: 14 },

  startButton: {
    width: 250,
    height: 52,
    backgroundColor: '#FFB826',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 3,
  },
  startButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});