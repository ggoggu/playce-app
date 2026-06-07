import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useCourse } from '../context/CourseState';
import { THEME_ASSETS } from '../config/ThemeAssets'; // 🌟 1단계에서 만든 보따리 불러오기

export default function CourseProgressScreen() {
  // 🌟 activeTheme('history' 또는 'movie')을 가져옵니다.
  const { activeTheme, cancelCourse } = useCourse();
    
  // 🌟 현재 활성화된 테마의 자원(텍스트, 이미지)을 통째로 꺼내옵니다.
  // 혹시나 값이 비어있을 경우를 대비해 기본값으로 'history'를 지정합니다.
  const currentTheme = THEME_ASSETS[activeTheme || 'history'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 1. 배경 그라데이션 (동적 매핑) */}
        <Image 
          source={currentTheme.bgGradient} 
          style={styles.bgGradient} 
        />

        {/* 2. 구불구불한 길 (동적 매핑) */}
        <Image 
          source={currentTheme.bgPath} 
          style={styles.bgPath} 
          resizeMode="contain"
        />

        {/* 3. 장식용 나무들 (동적 매핑) */}
        <View style={styles.treeContainer} pointerEvents="none">
          {/* 상단 나무 2개 */}
          <View style={styles.treeTopGroup}>
            <View style={{ alignItems: 'flex-start' }}>
              <Image source={currentTheme.trees[0]} style={styles.tree1} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Image source={currentTheme.trees[1]} style={styles.tree2} />
            </View>
          </View>
          {/* 하단 나무 2개 */}
          <View style={styles.treeBottomGroup}>
            <View style={{ alignItems: 'flex-start' }}>
              <Image source={currentTheme.trees[2]} style={styles.tree3} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Image source={currentTheme.trees[3]} style={styles.tree4} />
            </View>
          </View>
        </View>

        {/* 4. 헤더 영역 (PLAYCE + 햄버거) */}
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>

          <TouchableOpacity onPress={cancelCourse} style={styles.cancelButton}>
            <Text style={styles.cancelText}>코스 취소</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hamburgerButton}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </TouchableOpacity>
        </View>

        {/* 5. 메인 UI (타이틀, 진행률, 코스 노드) */}
        <View style={styles.mainUIContainer} pointerEvents="box-none">
          
          {/* 타이틀 및 진행도 */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              <Text style={styles.highlightText}>행궁체험사랑</Text>님은{'\n'}
              {/* 🌟 하드코딩되어 있던 텍스트를 선택된 테마 제목으로 변경 */}
              <Text style={styles.highlightText}>{currentTheme.themeTitle}</Text>로드를 진행중입니다!
            </Text>

            <View style={styles.progressBox}>
              <View style={styles.progressBar} />
              <Text style={styles.progressText}>진행률 0%</Text>
            </View>
          </View>

          {/* 6. 코스 노드 배치 영역 (동적 매핑) */}
          <View style={styles.nodesContainer}>
            {/* 상단 4, 5번 */}
            <View style={styles.nodeRowTop}>
              <CourseNode num={4} imageSource={currentTheme.nodes[4]} starBadge={currentTheme.starBadge} />
              <CourseNode num={5} imageSource={currentTheme.nodes[5]} starBadge={currentTheme.starBadge} />
            </View>

            {/* 중간 3번 */}
            <View style={styles.nodeRowCenter}>
              <CourseNode num={3} imageSource={currentTheme.nodes[3]} starBadge={currentTheme.starBadge} />
            </View>

            {/* 하단 1, 2번 */}
            <View style={styles.nodeRowBottom}>
              <CourseNode num={1} imageSource={currentTheme.nodes[1]} starBadge={currentTheme.starBadge} />
              <CourseNode num={2} imageSource={currentTheme.nodes[2]} starBadge={currentTheme.starBadge} />
            </View>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

// 🌟 개별 건물 아이콘 컴포넌트 (별 배지도 동적으로 받도록 수정)
const CourseNode = ({ num, imageSource, starBadge }: { num: number, imageSource: any, starBadge: any }) => (
  <View style={styles.nodeWrapper}>
    <View style={styles.nodeOuterCircle}>
      <View style={styles.nodeInnerCircle}>
        <Image source={imageSource} style={styles.nodeImage} resizeMode="contain" />
      </View>
    </View>

    {/* 별 모양 숫자 배지 동적 변경 */}
    <ImageBackground 
      source={starBadge} 
      style={styles.starBadge}
      resizeMode="contain"
    >
      <Text style={styles.starBadgeText}>{num}</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9E6' },
  container: { flex: 1, position: 'relative' },
  bgGradient: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  bgPath: { position: 'absolute', width: 325, height: 707, top: 40, alignSelf: 'center' },
  treeContainer: { position: 'absolute', top: 178, left: 22, right: 22, height: 670 },
  treeTopGroup: { gap: 76, marginBottom: 80 },
  treeBottomGroup: { gap: 80 },
  tree1: { width: 106, height: 90, resizeMode: 'contain' },
  tree2: { width: 79, height: 109, resizeMode: 'contain' },
  tree3: { width: 41, height: 88, resizeMode: 'contain' },
  tree4: { width: 99, height: 155, resizeMode: 'contain' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 38, paddingTop: 20, zIndex: 10 },
  logoText: { fontSize: 20, fontWeight: '900', color: '#FFB826', textShadowColor: 'rgba(0,0,0,0.2)', textShadowRadius: 20 },
  hamburgerButton: { width: 24, height: 24, justifyContent: 'space-evenly', alignItems: 'center' },
  hamburgerLine: { width: 18, height: 2, backgroundColor: '#8A8A8A' },
  mainUIContainer: { flex: 1, paddingHorizontal: 35, paddingTop: 20 },
  titleSection: { marginBottom: 20 },
  mainTitle: { fontSize: 24, fontWeight: '800', color: '#000000', lineHeight: 32, marginBottom: 10 },
  highlightText: { color: '#1BC5CC' },
  progressBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12, width: 197, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 2 },
  progressBar: { width: 44, height: 12, borderRadius: 20 },
  progressText: { fontSize: 10, fontWeight: '500', color: '#8A8A8A', marginLeft: 'auto' },
  nodesContainer: { alignSelf: 'center', width: 257.17, height: 416.34, justifyContent: 'space-between', marginTop: 10 },
  nodeRowTop: { flexDirection: 'row', justifyContent: 'center', gap: 65 },
  nodeRowCenter: { flexDirection: 'row', justifyContent: 'center' },
  nodeRowBottom: { flexDirection: 'row', justifyContent: 'center', gap: 59 },
  nodeWrapper: { position: 'relative', width: 74.78, height: 74.78, justifyContent: 'center', alignItems: 'center' },
  nodeOuterCircle: { width: 74.78, height: 74.78, backgroundColor: '#FBFBDD', borderRadius: 37.5, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  nodeInnerCircle: { width: 58.78, height: 58.78, backgroundColor: '#FFB826', borderRadius: 29.5, justifyContent: 'center', alignItems: 'center' },
  nodeImage: { width: 50, height: 50 },
  starBadge: { position: 'absolute', top: -8, left: -4, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  starBadgeText: { fontFamily: 'Pretendard', fontWeight: '700', fontSize: 12, color: '#FFFFFF', marginTop: 2 },
  cancelButton: { backgroundColor: '#8A8A8A', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  cancelText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 }
});