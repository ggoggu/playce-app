import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CoursePopup from '../components/CoursePopup';
import { useCourse } from '../context/CourseState';
import CourseProgressScreen from './CourseProgressScreen';
import { styles } from './CourseScreen.styles'; // 🌟 분리한 스타일 불러오기

const CARD_WIDTH = 294;
const CARD_GAP = 28;

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
    path: '이태원 클라쓰 - 선재 업고 튀어 - 이상한 변호사 우영우\n그 해 우리는 - 전우치 - 클래식',
    bgImage: require('../../assets/images/course_bg_1.png'),
    mainImage: require('../../assets/images/course_movie/node_6_classic.png'),
    popupImage: require('../../assets/images/course_movie/node_6_classic.png'),
  },
} as const;

type CoursePopupData = {
  title: string;
  path: string;
  image: any;
  themeId: '' | keyof typeof COURSES;
  isInProgress: boolean;
};

export default function CourseScreen() {
  const { isCourseActive, courseProgressStates, startCourse } = useCourse();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState<CoursePopupData>({
    title: '',
    path: '',
    image: null,
    themeId: '',
    isInProgress: false,
  });

  const openPopup = (themeId: keyof typeof COURSES) => {
    const selected = COURSES[themeId];
    setPopupData({
      title: selected.title,
      path: selected.path,
      image: selected.popupImage,
      themeId: selected.id,
      isInProgress: Boolean(courseProgressStates[themeId]),
    });
    setPopupVisible(true);
  };

  const handleStartCourse = () => {
    setPopupVisible(false);
    if (popupData.themeId) {
      startCourse(popupData.themeId);
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
          <CardItem
            course={COURSES.history}
            courseNum="1"
            isInProgress={Boolean(courseProgressStates.history)}
            onPress={() => openPopup('history')}
          />
          <CardItem
            course={COURSES.movie}
            courseNum="2"
            isInProgress={Boolean(courseProgressStates.movie)}
            onPress={() => openPopup('movie')}
          />
        </ScrollView>
      </View>

      <CoursePopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onStart={handleStartCourse}
        title={popupData.title}
        coursePath={popupData.path}
        imageSource={popupData.image}
        isInProgress={popupData.isInProgress}
      />
    </SafeAreaView>
  );
}

const CardItem = ({ course, courseNum, isInProgress, onPress }: any) => (
  <View style={styles.cardWrapper}>
    <ImageBackground source={course.bgImage} style={styles.cardBg} imageStyle={{ borderRadius: 20 }}>
      <Image source={course.mainImage} style={styles.cardIllustration} resizeMode="contain" />
      <View style={styles.cardContentTop}>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <View style={styles.tagIcon} />
            <Text style={styles.tagText}>코스{courseNum}</Text>
          </View>
          {isInProgress && (
            <View style={styles.progressTag}>
              <Text style={styles.progressTagText}>진행 중</Text>
            </View>
          )}
        </View>
        <View style={styles.cardTextGroup}>
          <Text style={styles.cardTitle}>{course.title}</Text>
          <Text style={styles.cardDesc}>{course.desc}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={onPress} activeOpacity={0.9}>
        <Text style={styles.startButtonText}>{isInProgress ? '이어보기' : '시작하기'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);
