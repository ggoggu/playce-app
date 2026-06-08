import React from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import { useCourse } from '../context/CourseState';
import { THEME_ASSETS } from '../config/ThemeAssets';
import BottomNav from '../components/BottomNav';
import { styles } from './CourseProgressScreen.styles'; // 🌟 분리한 스타일 불러오기

export default function CourseProgressScreen() {
  const { activeTheme } = useCourse();
  const currentTheme = THEME_ASSETS[activeTheme || 'history'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={currentTheme.bgGradient} style={styles.bgGradient} resizeMode="cover" />
      
      <View style={styles.bgPathContainer} pointerEvents="none">
        <Image source={currentTheme.bgPath} style={styles.bgPath} resizeMode="contain" />
      </View>

      {currentTheme.trees && currentTheme.trees.length >= 4 && (
        <View style={styles.treesContainer} pointerEvents="none">
          <Image source={currentTheme.trees[0]} style={[styles.tree, { top: 188.5, left: 37.3, width: 106.4, height: 91 }]} />
          <Image source={currentTheme.trees[1]} style={[styles.tree, { top: 370.5, left: 285.6, width: 79, height: 109.8 }]} />
          <Image source={currentTheme.trees[2]} style={[styles.tree, { top: 495.4, left: 37.5, width: 41.5, height: 88.3 }]} />
          <Image source={currentTheme.trees[3]} style={[styles.tree, { top: 683.7, left: 270, width: 99.5, height: 155.1 }]} />
        </View>
      )}

      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>
        </View>

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

        <View style={styles.nodesContainer}>
          <View style={styles.nodeRowTop}>
            <CourseNode num={4} image={currentTheme.nodes[4]} badge={currentTheme.starBadge} />
            <CourseNode num={5} image={currentTheme.nodes[5]} badge={currentTheme.starBadge} />
          </View>
          <View style={styles.nodeRowCenter}>
            <CourseNode num={3} image={currentTheme.nodes[3]} badge={currentTheme.starBadge} />
          </View>
          <View style={styles.nodeRowBottom}>
            <CourseNode num={1} image={currentTheme.nodes[1]} badge={currentTheme.starBadge} />
            <CourseNode num={2} image={currentTheme.nodes[2]} badge={currentTheme.starBadge} />
          </View>
        </View>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

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