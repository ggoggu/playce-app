import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useCourse } from '../context/CourseState';
import CourseProgressScreen from './CourseProgressScreen';
import BottomNav from '../components/BottomNav';
import CoursePopup from '../components/CoursePopup';
import { commonStyles } from '../styles/common';
import { styles } from './CourseScreen.styles'; // 🌟 분리한 스타일 불러오기

const CARD_WIDTH = 294;
const CARD_GAP = 28;

export default function CourseScreen() {
  const { isCourseActive, startCourse } = useCourse();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', path: '', image: null, themeId: '' });

  const COURSES = {
    history: {
      id: 'history',
      title: '역사테마',
      desc: '행궁동에 얽힌 역사 이야기들과 함께 문화재를 구경해요!',
      path: '화성행궁 - 화령전 - 서장대\n서북각루 - 화서문 & 서북공심돈',
      bgImage: require('../../assets/images/course_bg_1.png'),
      mainImage: require('../../assets/images/theme_history_main.png'),
      popupImage: require('../../assets/images/theme_history_popup.png'),
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
      <View style={styles.header}>
        <Text style={styles.logoText}>PLAYCE</Text>
        <TouchableOpacity style={styles.hamburgerButton}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.mainTitle}>
          <Text style={styles.pointText}>행궁체험사랑</Text>님,{"\n"}어떤 코스로 안내드릴까요?
        </Text>
        <Text style={styles.subTitle}>
          행궁체험사랑님의 취향에 맞는 코스를 선택해,{"\n"}나만의 관광가이드와 함께하세요!
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          decelerationRate="fast"
        >
          <CardItem course={COURSES.history} courseNum="1" onPress={() => openPopup('history')} />
          <CardItem course={COURSES.movie} courseNum="2" onPress={() => openPopup('movie')} />
        </ScrollView>
      </View>

      <BottomNav />

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

const CardItem = ({ course, courseNum, onPress }: any) => (
  <View style={styles.cardWrapper}>
    <ImageBackground source={course.bgImage} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
      <Image source={course.mainImage} style={styles.cardIllustration} resizeMode="contain" />
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
      <TouchableOpacity style={styles.startButton} onPress={onPress} activeOpacity={0.9}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);