// src/screens/AudioGuideScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AudioPlayerSheet from '../components/AudioPlayerSheet';
import CourseCompletePopup from '../components/CourseCompletePopup';
import { COURSE_DATA } from '../constants/CourseData'; // 🌟 1단계 메타데이터
import { useCourse } from '../context/CourseState';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { styles } from './AudioGuideScreen.styles';

export default function AudioGuideScreen() {
  const router = useRouter();
  
  const { activeTheme, activeNode, currentNodeIndex, completedNodes, completeNode } = useCourse();

  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : COURSE_DATA['history'];
  const currentNodeData = activeNode || currentThemeData.nodes.find(node => node.id === currentNodeIndex) || currentThemeData.nodes[0];

  const { 
    isPlaying, isFinished, positionStr, durationStr, progressRatio, togglePlayPause 
  } = useAudioPlayer(currentNodeData.audioSource);

  const isAlreadyCompleted = completedNodes.includes(currentNodeData.id);
  const nextCompletedCount = isAlreadyCompleted ? completedNodes.length : completedNodes.length + 1;
  const isThemeMastered = nextCompletedCount >= currentThemeData.totalNodes;

  const handleContinue = () => {
    if (currentNodeData.id) {
      completeNode(currentNodeData.id);
    } 
    router.replace('/course' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require('../../assets/images/course_history/bg_audio_history.png')} style={styles.bgImage} />

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/course' as any)} activeOpacity={0.7}>
          <Text style={{ fontSize: 24, color: '#8A8A8A' }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentThemeData.themeTitle}의 코스는 {currentNodeData.placeName}입니다!</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image source={currentNodeData.images.bg} style={styles.illustBg} resizeMode="contain" />
        <Image source={require('../../assets/images/course_history/deco_cloud_1.png')} style={styles.cloud1} resizeMode="contain" />
        <Image source={require('../../assets/images/course_history/deco_cloud_2.png')} style={styles.cloud2} resizeMode="contain" />
        <Image 
          source={currentNodeData.images.building} 
          style={[styles.mainIllust, currentNodeData.buildingStyle]} 
          resizeMode="contain" 
        />
        
        <View style={styles.titleBox}>
          <Text style={styles.titleBoxText}>{currentNodeData.placeName}</Text>
        </View>
      </View>

      <AudioPlayerSheet 
        totalNodes={currentThemeData.totalNodes}
        currentNodeIndex={currentNodeData.id}
        completedNodes={completedNodes}
        isPlaying={isPlaying}
        isFinished={isFinished}
        positionStr={positionStr}
        durationStr={durationStr}
        progressRatio={progressRatio}
        onTogglePlay={togglePlayPause}
        placeName={currentNodeData.placeName}
      />

      <CourseCompletePopup 
        visible={isFinished} 
        titleText={isThemeMastered ? "모든 코스를\n모두 둘러보았어요!" : `${currentNodeData.id}번째 코스를\n모두 둘러보았어요`}
        badgeImage={currentNodeData.badgeImage}
        isThemeMastered={isThemeMastered}
        onContinue={handleContinue} 
        onGoToBadgeBox={() => {
          if (currentNodeData.id) {
            completeNode(currentNodeData.id);
          }
          router.replace('/profile' as any);
        }}
      />
    </SafeAreaView>
  );
}
