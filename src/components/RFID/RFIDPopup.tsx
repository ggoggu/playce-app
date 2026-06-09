// src/components/RFIDPopup.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { styles } from './RFIDPopup.styles';

interface RFIDPopupProps {
  visible: boolean;              // 팝업 표시 여부
  onClose: () => void;           // 뒤로가기 눌렀을 때의 동작
  onStartAudio: () => void;      // 오디오 가이드 시작하기 눌렀을 때의 동작
  placeName: string;             // 예: "화성행궁" (동적으로 바꿀 수 있도록 분리)
  imageSource?: any;             // 중앙 일러스트 이미지
}

export default function RFIDPopup({ 
  visible, 
  onClose, 
  onStartAudio, 
  placeName, 
  imageSource 
}: RFIDPopupProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          {/* 중앙 일러스트 (이미지가 전달된 경우에만 렌더링) */}
          {imageSource && (
            <Image source={imageSource} style={styles.popupImage} resizeMode="contain" />
          )}

          {/* 텍스트 영역 */}
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>태그인식이 감지되었습니다</Text>
            <Text style={styles.mainTitle}>{placeName}에 도착하였습니다!</Text>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.startButton} onPress={onStartAudio} activeOpacity={0.9}>
              <Text style={styles.startButtonText}>오디오 가이드 시작하기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.backButtonText}>뒤로가기</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
  );
}