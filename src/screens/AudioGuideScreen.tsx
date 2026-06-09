// src/screens/AudioGuideScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCourse } from '../context/CourseState';
import { COURSE_DATA } from '../constants/CourseData'; // 🌟 1단계 메타데이터
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioPlayerSheet from '../components/AudioPlayerSheet';
import CourseCompletePopup from '../components/CourseCompletePopup';
import { styles } from './AudioGuideScreen.styles';

export default function AudioGuideScreen() {
  const router = useRouter();
  
  // 🌟 전역 상태 꺼내오기
  const { activeTheme, currentNodeIndex, completedNodes, completeNode } = useCourse();

  // 현재 테마와, 현재 진입한 특정 노드(장소)의 데이터를 찾습니다.
  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : COURSE_DATA['history'];
  const currentNodeData = currentThemeData.nodes.find(node => node.id === currentNodeIndex) || currentThemeData.nodes[0];

  // 🌟 동적 오디오 로드 (하드코딩 제거!)
  const { 
    isPlaying, isFinished, positionStr, durationStr, progressRatio, togglePlayPause 
  } = useAudioPlayer(currentNodeData.audioSource);

  const isAlreadyCompleted = completedNodes.includes(currentNodeData.id);
  const nextCompletedCount = isAlreadyCompleted ? completedNodes.length : completedNodes.length + 1;

const isThemeMastered = nextCompletedCount >= currentThemeData.totalNodes;

  // 마저 관광하기 버튼 클릭 시
  const handleContinue = () => {
    if (currentNodeIndex) {
      completeNode(currentNodeIndex); // 현재 노드 번호를 완료 처리
    }
    if (isThemeMastered) {
      // TODO: 나중에 '테마 완료 축하 화면'이나 '최종 보상 화면'을 만들면 여기 주소를 바꾸세요!
      console.log("🎉 테마 올 클리어! 보상 화면으로 이동합니다.");
      router.replace('/course-progress' as any); 
    } else {
      // 아직 남은 코스가 있다면 평소처럼 지도 화면으로 돌아갑니다.
      router.replace('/course-progress' as any); 
    } 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require('../../assets/images/course_history/bg_audio_history.png')} style={styles.bgImage} />

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={{ fontSize: 24, color: '#8A8A8A' }}>←</Text>
        </TouchableOpacity>
        {/* 🌟 동적 테마명과 장소명 렌더링 */}
        <Text style={styles.headerTitle}>{currentThemeData.themeTitle}의 코스는 {currentNodeData.placeName}입니다!</Text>
      </View>

      <View style={styles.illustrationContainer}>
        {/* 🌟 동적 이미지 렌더링 (데이터 모델에서 가져옴) */}
        <Image source={currentNodeData.images.bg} style={styles.illustBg} resizeMode="contain" />
        <Image source={require('../../assets/images/course_history/deco_cloud_1.png')} style={styles.cloud1} resizeMode="contain" />
        <Image source={require('../../assets/images/course_history/deco_cloud_2.png')} style={styles.cloud2} resizeMode="contain" />
        <Image source={currentNodeData.images.building} style={styles.mainIllust} resizeMode="contain" />
        
        <View style={styles.titleBox}>
          {/* 🌟 동적 장소명 렌더링 */}
          <Text style={styles.titleBoxText}>{currentNodeData.placeName}</Text>
        </View>
      </View>

      {/* 🌟 업데이트된 하단 시트 컴포넌트에 동적 데이터 주입 */}
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
        // 🌟 올 클리어 여부에 따라 팝업 문구를 아주 똑똑하게 변경합니다!
        titleText={isThemeMastered ? "모든 코스를\n모두 둘러보았어요!" : `${currentNodeData.id}번째 코스를\n모두 둘러보았어요`}
        onContinue={handleContinue} 
        onGoToBadgeBox={() => console.log("배지함 이동")}
      />
    </SafeAreaView>
  );
}