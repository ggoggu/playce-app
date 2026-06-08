import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useCourse } from '../context/CourseState';
import { THEME_ASSETS } from '../config/ThemeAssets';
import BottomNav from '../components/BottomNav';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CourseProgressScreen() {
  const { activeTheme } = useCourse();
  const currentTheme = THEME_ASSETS[activeTheme || 'history'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* 1. 배경 그라데이션 (CSS: transform: matrix(-1, 0, 0, 1, 0, 0)) */}
      <Image source={currentTheme.bgGradient} style={styles.bgGradient} resizeMode="cover" />
      
      {/* 2. 구불구불한 코스 길 (CSS: top: -32.07px) */}
      <View style={styles.bgPathContainer} pointerEvents="none">
        <Image source={currentTheme.bgPath} style={styles.bgPath} resizeMode="contain" />
      </View>

      {/* 3. 🌟 장식용 나무 4그루 (SVG 절대 좌표 반영) */}
      {currentTheme.trees && currentTheme.trees.length >= 4 && (
        <View style={styles.treesContainer} pointerEvents="none">
          <Image source={currentTheme.trees[0]} style={[styles.tree, { top: 188.5, left: 37.3, width: 106.4, height: 91 }]} />
          <Image source={currentTheme.trees[1]} style={[styles.tree, { top: 370.5, left: 285.6, width: 79, height: 109.8 }]} />
          <Image source={currentTheme.trees[2]} style={[styles.tree, { top: 495.4, left: 37.5, width: 41.5, height: 88.3 }]} />
          <Image source={currentTheme.trees[3]} style={[styles.tree, { top: 683.7, left: 270, width: 99.5, height: 155.1 }]} />
        </View>
      )}

      {/* 4. 메인 컨텐츠 영역 */}
      <View style={styles.mainContainer}>
        
        {/* 상단 로고 */}
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>
        </View>

        {/* 안내 문구 및 진행도 UI */}
        <View style={styles.topSection}>
          <Text style={styles.mainTitle}>
            행궁체험사랑님은{'\n'}{currentTheme.themeTitle}로드를{'\n'}진행중입니다!
          </Text>
          
          <View style={styles.progressWrapper}>
            <Text style={styles.progressLabel}>진행도</Text>
            <View style={styles.progressRight}>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={styles.progressValue}>진행률 0%</Text>
            </View>
          </View>
        </View>

        {/* 5. 지그재그 코스 노드 배치 (CSS gap 및 정렬 반영) */}
        <View style={styles.nodesContainer}>
          {/* 상단: 노드 4(서북각루), 노드 5(화서문) */}
          <View style={styles.nodeRowTop}>
            <CourseNode num={4} image={currentTheme.nodes[4]} badge={currentTheme.starBadge} />
            <CourseNode num={5} image={currentTheme.nodes[5]} badge={currentTheme.starBadge} />
          </View>
          
          {/* 중단: 노드 3(서장대) */}
          <View style={styles.nodeRowCenter}>
            <CourseNode num={3} image={currentTheme.nodes[3]} badge={currentTheme.starBadge} />
          </View>
          
          {/* 하단: 노드 1(화성행궁), 노드 2(화령전) */}
          <View style={styles.nodeRowBottom}>
            <CourseNode num={1} image={currentTheme.nodes[1]} badge={currentTheme.starBadge} />
            <CourseNode num={2} image={currentTheme.nodes[2]} badge={currentTheme.starBadge} />
          </View>
        </View>

      </View>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </SafeAreaView>
  );
}

// 🃏 개별 코스 노드 컴포넌트
const CourseNode = ({ num, image, badge }: { num: number, image: any, badge: any }) => (
  <View style={styles.nodeWrapper}>
    <View style={styles.nodeOuterCircle}>
      <View style={styles.nodeInnerCircle}>
        <Image source={image} style={styles.nodeImage} resizeMode="contain" />
      </View>
    </View>
    
    <ImageBackground source={badge} style={styles.nodeBadge}>
      <Text style={styles.nodeBadgeText}>{num}</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFF9E6' 
  },
  
  // 배경 
  bgGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transform: [{ scaleX: -1 }], 
  },
  bgPathContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    top: -32, // CSS 시안 좌표
  },
  bgPath: {
    width: 325.64,
    height: 707.28,
  },

  // 나무 데코레이션 컨테이너
  treesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  tree: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.7, // SVG fill-opacity="0.7" 반영
  },

  mainContainer: {
    flex: 1,
    paddingHorizontal: 35,
    zIndex: 1, // 배경 위에 확실히 뜨도록 처리
  },
  
  header: {
    marginTop: 50,
  },
  logoText: {
    fontFamily: 'Rammetto One',
    fontSize: 20,
    color: '#FFB826',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  topSection: {
    marginTop: 20,
    gap: 10,
  },
  mainTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: '#1BC5CC',
  },
  progressWrapper: {
    width: 197.13,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  progressLabel: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 10,
    color: '#8A8A8A',
  },
  progressRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  progressBarBg: {
    width: 44,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '0%', 
    height: '100%',
    backgroundColor: '#FFB826',
  },
  progressValue: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: '#8A8A8A',
  },

  // 코스 노드 배치
  nodesContainer: {
    alignSelf: 'center',
    marginTop: 35,
    width: 257.17,
    height: 416.34,
    justifyContent: 'space-between', 
  },
  nodeRowTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 65, 
  },
  nodeRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nodeRowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 59, 
  },

  nodeWrapper: {
    width: 74.78,
    height: 74.78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeOuterCircle: {
    width: 74.78,
    height: 74.78,
    backgroundColor: '#FBFBDD',
    borderRadius: 37.39,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  nodeInnerCircle: {
    width: 58.78,
    height: 58.78,
    backgroundColor: '#FFB826',
    borderRadius: 29.39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeImage: {
    width: 51.83,
    height: 51.83,
  },
  nodeBadge: {
    position: 'absolute',
    top: -11.42, 
    left: -3.22,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeBadgeText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 2, 
  }
});