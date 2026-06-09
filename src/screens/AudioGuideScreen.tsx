// src/screens/AudioGuideScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useCourse } from '../context/CourseState';
import AudioPlayerSheet from '../components/AudioPlayerSheet';
import CourseCompletePopup from '../components/CourseCompletePopup';
import { styles } from './AudioGuideScreen.styles';

export default function AudioGuideScreen() {
  const router = useRouter();
  const { completeNode } = useCourse();
  
  // 🌟 오디오 제어 훅 연결: assets 폴더의 1.mp3 파일 로드
  const { 
    isPlaying, isFinished, positionStr, durationStr, progressRatio, togglePlayPause 
  } = useAudioPlayer(require('../../assets/audio/history/1.mp3'));

  const handleContinue = () => {
    completeNode(1); // 전역 상태에 1번 코스 완료 기록 (이걸로 이전 화면의 노드가 파랗게 변함)
    router.back();   // 오디오 화면을 닫고 이전 화면(코스 진행 UI)으로 돌아감
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. 앱 전체 배경 : bg_audio_history.png */}
      <Image 
        source={require('../../assets/images/course_history/bg_audio_history.png')} 
        style={styles.bgImage} 
      />

      {/* 2. 상단 헤더 영역 */}
      <View style={styles.headerContainer}>
  <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
    <Text style={{ fontSize: 24, color: '#8A8A8A' }}>←</Text>
  </TouchableOpacity>
  <Text style={styles.headerTitle}>역사테마여정의 첫번째 코스는 화성행궁입니다!</Text>
</View>

      {/* 3. 중앙 일러스트 뷰 */}
      <View style={styles.illustrationContainer}>
        {/* 배경 : bg_illust_haenggung.png */}
        <Image 
          source={require('../../assets/images/course_history/bg_illust_haenggung.png')} 
          style={styles.illustBg} 
          resizeMode="contain" 
        />
        
        {/* 구름 : deco_cloud_1.png, deco_cloud_2.png */}
        <Image 
          source={require('../../assets/images/course_history/deco_cloud_1.png')} 
          style={styles.cloud1} 
          resizeMode="contain" 
        />
        <Image 
          source={require('../../assets/images/course_history/deco_cloud_2.png')} 
          style={styles.cloud2} 
          resizeMode="contain" 
        />
        
        {/* 화성행궁 (메인 건축물) : building_haenggung.png */}
        <Image 
          source={require('../../assets/images/course_history/building_haenggung.png')} 
          style={styles.mainIllust} 
          resizeMode="contain" 
        />
        
        {/* 제목 박스 (코드로 직접 구현) */}
        <View style={styles.titleBox}>
          <Text style={styles.titleBoxText}>화성행궁</Text>
        </View>
      </View>

      {/* 4. 하단 오디오 플레이어 시트 연결 */}
      <AudioPlayerSheet 
        isPlaying={isPlaying}
        isFinished={isFinished} // 🌟 오디오가 완료되면 시트 내부의 1번 노드가 파란색으로 변함!
        positionStr={positionStr}
        durationStr={durationStr}
        progressRatio={progressRatio}
        onTogglePlay={togglePlayPause}
      />

      <CourseCompletePopup 
        visible={isFinished} // 오디오가 끝나면 자동으로 true가 되어 팝업 등장!
        onContinue={handleContinue} 
        onGoToBadgeBox={() => console.log("배지함 이동 로직 추후 추가")}
      />
      
    </SafeAreaView>
  );
}