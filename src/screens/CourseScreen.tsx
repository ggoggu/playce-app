import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useCourse } from '../context/CourseState';
import CourseProgressScreen from './CourseProgressScreen';
import BottomNav from '../components/BottomNav';
import CoursePopup from '../components/CoursePopup'; // 🌟 팝업 컴포넌트 불러오기

export default function CourseScreen() {
  const { isCourseActive, startCourse } = useCourse();
  
  // 🌟 팝업 상태 관리 (이전 코드 로직 유지)
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', path: '', image: null, themeId: '' });

  // 🌟 테마별 정해진 코스 데이터
  const COURSES = {
    history: {
      id: 'history',
      title: '역사테마',
      path: '화성행궁 - 화령전 - 서장대\n서북각루 - 화서문 & 서북공심돈',
      image: require('../../assets/images/theme_history_popup.png')
    },
    movie: {
      id: 'movie',
      title: '영화 & 드라마',
      path: '행궁동 벽화마을 - 드라마 촬영지 1\n명장면 카페거리 - 영화 촬영지 2',
      image: require('../../assets/images/theme_history_popup.png') // 영화 테마 이미지가 준비될 때까지 임시 사용
    }
  };

  // 🌟 팝업 열기 함수
  const openPopup = (themeId: 'history' | 'movie') => {
    const selected = COURSES[themeId];
    setPopupData({
      ...selected,
      themeId: selected.id
    });
    setPopupVisible(true);
  };

  // 🌟 팝업에서 시작하기를 눌렀을 때의 핸들러
  const handleStartCourse = () => {
    setPopupVisible(false);
    if (popupData.themeId) {
      startCourse(popupData.themeId as 'history' | 'movie');
    }
  };

  // 코스 진행 중이면 지도 화면으로 바로 이동
  if (isCourseActive) {
    return <CourseProgressScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 1. 상단 헤더 (PLAYCE 로고 & 햄버거 메뉴) */}
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>
          <TouchableOpacity style={styles.hamburgerButton}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </TouchableOpacity>
        </View>

        {/* 2. 타이틀 영역 */}
        <View style={styles.titleArea}>
          <Text style={styles.mainTitle}>
            <Text style={styles.pointText}>행궁체험사랑</Text>님,{'\n'}어떤 코스로 안내드릴까요?
          </Text>
          <Text style={styles.subTitle}>
            행궁체험사랑님의 취향에 맞는 코스를 선택해,{'\n'}나만의 관광가이드와 함께하세요!
          </Text>
        </View>

        {/* 3. 코스 선택 카드 슬라이더 (가로 스크롤) */}
        <View style={styles.sliderContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
          >
            
            {/* 🃏 카드 1: 역사 테마 */}
            <View style={styles.cardWrapper}>
              <ImageBackground 
                source={COURSES.history.image} 
                style={styles.cardBg}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.cardTopArea}>
                  <View style={styles.tag}>
                    <View style={styles.tagIcon} />
                    <Text style={styles.tagText}>코스1</Text>
                  </View>
                  <View style={styles.textArea}>
                    <Text style={styles.cardTitle}>{COURSES.history.title}</Text>
                    <Text style={styles.cardDesc}>행궁동에 얽힌 역사 이야기들과 함께 문화재를 구경해요!</Text>
                  </View>
                </View>

                {/* 🌟 버튼을 누르면 팝업창이 열리도록 변경 */}
                <TouchableOpacity 
                  style={styles.startButton} 
                  onPress={() => openPopup('history')}
                >
                  <Text style={styles.startButtonText}>시작하기</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            {/* 🃏 카드 2: 영화 & 드라마 테마 */}
            <View style={styles.cardWrapper}>
              <ImageBackground 
                source={COURSES.movie.image} 
                style={styles.cardBg}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.cardTopArea}>
                  <View style={styles.tag}>
                    <View style={styles.tagIcon} />
                    <Text style={styles.tagText}>코스2</Text>
                  </View>
                  <View style={styles.textArea}>
                    <Text style={styles.cardTitle}>{COURSES.movie.title}</Text>
                    <Text style={styles.cardDesc}>행궁동에서 영화 & 드라마 속 명장면을 찾아보세요!</Text>
                  </View>
                </View>

                {/* 🌟 버튼을 누르면 팝업창이 열리도록 변경 */}
                <TouchableOpacity 
                  style={styles.startButton} 
                  onPress={() => openPopup('movie')}
                >
                  <Text style={styles.startButtonText}>시작하기</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </ScrollView>
        </View>

        {/* 4. 하단 네비게이션 바 */}
        <BottomNav />

        {/* 5. 🌟 팝업 컴포넌트 연동 (기존 코드 유지) */}
        <CoursePopup 
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
          onStart={handleStartCourse}
          data={popupData}
        />

      </View>
    </SafeAreaView>
  );
}

// 🌟 제공해주신 CSS를 React Native 스타일로 완벽 번역
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  // 헤더 스타일
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 38,
    marginTop: 20,
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
  hamburgerButton: {
    width: 24,
    height: 24,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  hamburgerLine: {
    width: 18,
    height: 2,
    backgroundColor: '#8A8A8A',
  },
  // 타이틀 영역 스타일
  titleArea: {
    paddingHorizontal: 38,
    marginTop: 34,
    gap: 19,
  },
  mainTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: '#000000',
  },
  pointText: {
    color: '#1BC5CC',
  },
  subTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#8A8A8A',
  },
  // 슬라이더 및 카드 스타일
  sliderContainer: {
    marginTop: 28,
    height: 420, // 하단 바에 가려지지 않도록 높이 확보
  },
  scrollContent: {
    paddingHorizontal: 38,
    gap: 28, // 카드 사이의 간격
  },
  cardWrapper: {
    width: 294,
    height: 395,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 22, 
    paddingBottom: 26, 
  },
  cardTopArea: {
    gap: 14,
  },
  tag: {
    width: 60,
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  tagIcon: {
    width: 12,
    height: 10,
    backgroundColor: '#FFB826',
    borderRadius: 2,
  },
  tagText: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  textArea: {
    gap: 12,
  },
  cardTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 24,
    color: '#FFFFFF',
  },
  cardDesc: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 10,
    color: '#E0E0E0',
    lineHeight: 14,
  },
  startButton: {
    width: 250,
    height: 52,
    backgroundColor: '#FFB826',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 3,
  },
  startButtonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  }
});