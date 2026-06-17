// src/screens/CourseProgressScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCourse } from '../context/CourseState';
import { COURSE_DATA } from '../constants/CourseData'; // 🌟 1단계에서 만든 메타데이터
import { THEME_ASSETS } from '../config/ThemeAssets';  // 기존 에셋 파일
import BottomNav from '../components/BottomNav';
import RFIDPopup from '../components/RFID/RFIDPopup';
import { styles } from './CourseProgressScreen.styles'; 

export default function CourseProgressScreen() {
  const router = useRouter();
  
  const { 
    activeTheme, 
    activeNode,
    isRFIDDetected, 
    closeRFID,
    completedNodes,
    progressPercent,
    triggerRFID,
    openCourseSelection,
  } = useCourse();

  const currentTheme = THEME_ASSETS[activeTheme || 'history'];
  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : COURSE_DATA['history'];
  const isComplete = !activeNode;

  const handleStartAudio = () => {
    if (!activeNode) {
      return;
    }

    closeRFID();
    router.push('/audio-guide' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={currentTheme.bgGradient} style={styles.bgGradient} resizeMode="cover" />
      
      <View style={[styles.bgPathContainer, { pointerEvents: 'none' }]}>
        <Image source={currentTheme.bgPath} style={styles.bgPath} resizeMode="contain" />
      </View>

      {currentTheme.trees && currentTheme.trees.length >= 4 && (
        <View style={[styles.treesContainer, { pointerEvents: 'none' }]}>
          <Image source={currentTheme.trees[0]} style={[styles.tree, { top: 188.5, left: 37.3, width: 106.4, height: 91 }]} />
          <Image source={currentTheme.trees[1]} style={[styles.tree, { top: 370.5, left: 285.6, width: 79, height: 109.8 }]} />
          <Image source={currentTheme.trees[2]} style={[styles.tree, { top: 495.4, left: 37.5, width: 41.5, height: 88.3 }]} />
          <Image source={currentTheme.trees[3]} style={[styles.tree, { top: 683.7, left: 270, width: 99.5, height: 155.1 }]} />
        </View>
      )}

      {/* 🌟 3단계 핵심: 기존 Row 방식 대신 .map()을 사용하여 동적으로 지도에 핀을 꽂습니다 */}
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 2, pointerEvents: 'box-none' }]}>
        {currentThemeData.nodes.map((node) => {
          const isCompleted = completedNodes.includes(node.id) || isComplete;
          const isCurrent = activeNode?.id === node.id;
          
          return (
            <CourseNode 
              key={node.id}
              num={node.id}
              image={currentTheme.nodes[node.id as keyof typeof currentTheme.nodes]}
              badge={currentTheme.starBadge}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              position={node.mapPosition}
              onPress={() => {
                if (isCurrent) {
                  triggerRFID();
                }
              }}
            />
          );
        })}
      </View>

      <View style={[styles.mainContainer, { pointerEvents: 'box-none' }]}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>
        </View>

        <View style={styles.topSection}>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>
              행궁체험사랑님은{'\n'}{currentThemeData.themeTitle}로드를{'\n'}진행중입니다!
            </Text>
            <TouchableOpacity style={styles.courseSelectButton} onPress={openCourseSelection} activeOpacity={0.8}>
              <Text style={styles.courseSelectButtonText}>코스 선택</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressWrapper}>
            <Text style={styles.progressLabel}>진행도</Text>
            <View style={styles.progressRight}>
              <View style={styles.progressBarBg}>
                <View style={[
                  styles.progressBarFill, 
                  { 
                    width: `${progressPercent}%`, 
                    backgroundColor: progressPercent > 0 ? '#1BC5CC' : '#FFB826' 
                  }
                ]} />
              </View>
              <Text style={styles.progressValue}>진행률 {progressPercent}%</Text>
            </View>
          </View>
        </View>
        
        {/* 기존에 하드코딩되었던 nodesContainer는 삭제 (절대 좌표 렌더링으로 대체) */}
      </View>

      <BottomNav />

      <RFIDPopup 
        visible={isRFIDDetected} 
        onClose={closeRFID} 
        onStartAudio={handleStartAudio} 
        placeName={activeNode?.placeName || '장소'} 
        imageSource={currentTheme.rfidPopupImage} 
      />

    </SafeAreaView>
  );
}

const CourseNode = ({
  num,
  image,
  badge,
  isCompleted,
  isCurrent,
  position,
  onPress,
}: {
  num: number;
  image: any;
  badge: any;
  isCompleted: boolean;
  isCurrent: boolean;
  position: { left: number; top: number };
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.nodeWrapper, { position: 'absolute', left: position.left, top: position.top }]}
    onPress={onPress}
    activeOpacity={isCurrent ? 0.88 : 1}
    disabled={!isCurrent}
  >
    <View style={styles.nodeOuterCircle}>
      <View style={[styles.nodeInnerCircle, { backgroundColor: isCompleted ? '#1BC5CC' : '#FFB826' }]}>
        <Image source={image} style={styles.nodeImage} resizeMode="contain" />
      </View>
    </View>
    <ImageBackground source={badge} style={styles.nodeBadge}>
      <Text style={styles.nodeBadgeText}>{num}</Text>
    </ImageBackground>
  </TouchableOpacity>
);
