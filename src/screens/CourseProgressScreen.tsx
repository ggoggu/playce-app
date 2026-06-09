// src/screens/CourseProgressScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCourse } from '../context/CourseState';
import { COURSE_DATA } from '../constants/CourseData'; // 🌟 1단계에서 만든 메타데이터
import { THEME_ASSETS } from '../config/ThemeAssets';  // 기존 에셋 파일
import BottomNav from '../components/BottomNav';
import RFIDPopup from '../components/RFID/RFIDPopup';
import { styles } from './CourseProgressScreen.styles'; 

export default function CourseProgressScreen() {
  const router = useRouter();
  
  // 🌟 2단계에서 개선한 전역 상태 꺼내오기
  const { 
    activeTheme, 
    isRFIDDetected, 
    rfidPlace, 
    closeRFID,
    triggerRFID,
    completedNodes,   // 완료된 노드 배열
    progressPercent,  // 계산된 진행률(%)
    setCurrentNode    // 현재 진입한 노드 설정 함수
  } = useCourse();

  // 현재 테마의 에셋(이미지)과 데이터(좌표/메타정보)를 모두 가져옵니다.
  const currentTheme = THEME_ASSETS[activeTheme || 'history'];
  const currentThemeData = activeTheme ? COURSE_DATA[activeTheme] : COURSE_DATA['history'];

  // RFID 팝업에서 '오디오 가이드 시작하기'를 눌렀을 때
  const handleStartAudio = () => {
    if (!rfidPlace || !currentThemeData) return;
    
    // 인식된 장소명으로 몇 번 노드인지 찾아서 전역 상태에 저장
    const detectedNode = currentThemeData.nodes.find(node => node.placeName === rfidPlace);
    if (detectedNode) {
      setCurrentNode(detectedNode.id); 
    }
    
    closeRFID(); 
    router.push('/audio-guide' as any); 
  };

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

      {/* 🌟 3단계 핵심: 기존 Row 방식 대신 .map()을 사용하여 동적으로 지도에 핀을 꽂습니다 */}
      <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]} pointerEvents="box-none">
        {currentThemeData.nodes.map((node) => {
          // 전역 상태에 이 노드의 번호가 포함되어 있는지 확인
          const isCompleted = completedNodes.includes(node.id);
          
          return (
            <CourseNode 
              key={node.id}
              num={node.id}
              image={currentTheme.nodes[node.id as keyof typeof currentTheme.nodes]} // 에셋 매핑
              badge={currentTheme.starBadge}
              isCompleted={isCompleted}       // 완료 여부 전달
              position={node.mapPosition}     // 데이터의 x,y 좌표 전달
            />
          );
        })}
      </View>

      <View style={styles.mainContainer} pointerEvents="box-none">
        <View style={styles.header}>
          <Text style={styles.logoText}>PLAYCE</Text>
        </View>

        <View style={styles.topSection}>
          <Text style={styles.mainTitle}>
            행궁체험사랑님은{'\n'}{currentThemeData.themeTitle}로드를{'\n'}진행중입니다!
          </Text>
          
          <View style={styles.progressWrapper}>
            <Text style={styles.progressLabel}>진행도</Text>
            <View style={styles.progressRight}>
              <View style={styles.progressBarBg}>
                {/* 🌟 동적 진행률 바: 퍼센트(width)와 색상을 변경합니다 */}
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
        placeName={rfidPlace || '장소'} 
        imageSource={currentTheme.rfidPopupImage} 
      />

      {/* 테스트용 RFID 버튼 */}
      <TouchableOpacity 
        style={{ padding: 10, backgroundColor: 'red', marginTop: 20, zIndex: 10 }}
        onPress={() => triggerRFID('화성행궁')} 
      >
        <Text style={{ color: 'white' }}>[테스트] 화성행궁 태그 인식하기</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );
}

// 🌟 기존 UI를 그대로 유지하되, 좌표(position)와 완료 상태(isCompleted)를 받아 스타일을 변경합니다.
const CourseNode = ({ num, image, badge, isCompleted, position }: { num: number, image: any, badge: any, isCompleted: boolean, position: {left: number, top: number} }) => (
  <View style={[styles.nodeWrapper, { position: 'absolute', left: position.left, top: position.top }]}>
    <View style={styles.nodeOuterCircle}>
      {/* 완료 상태면 민트색(#1BC5CC), 미완료 상태면 주황색(#FFB826) 적용 */}
      <View style={[styles.nodeInnerCircle, { backgroundColor: isCompleted ? '#1BC5CC' : '#FFB826' }]}>
        <Image source={image} style={styles.nodeImage} resizeMode="contain" />
      </View>
    </View>
    <ImageBackground source={badge} style={styles.nodeBadge}>
      <Text style={styles.nodeBadgeText}>{num}</Text>
    </ImageBackground>
  </View>
);