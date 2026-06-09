// src/components/CourseCompletePopup.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { styles } from './CourseCompletePopup.styles';

interface CourseCompletePopupProps {
  visible: boolean;
  titleText: string; // 🌟 외부에서 팝업 제목을 주입받도록 추가
  onContinue: () => void;
  onGoToBadgeBox?: () => void;
}

export default function CourseCompletePopup({ 
  visible, 
  titleText, // 🌟 프롭스 받기
  onContinue, 
  onGoToBadgeBox 
}: CourseCompletePopupProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          <View style={styles.topSection}>
            {/* 🌟 하드코딩 지우고 동적 텍스트 적용 */}
            <Text style={styles.mainTitle}>{titleText}</Text>
            
            <View style={styles.badgeSection}>
              <View style={styles.badgeCircle}>
                <Image 
                  source={require('../../assets/images/course_history/badge_history_1.png')} 
                  style={styles.badgeImage} 
                  resizeMode="contain" 
                />
              </View>
              <Text style={styles.badgeTitle}>배지를 받았어요!</Text>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.continueButton} onPress={onContinue} activeOpacity={0.8}>
              <Text style={styles.continueButtonText}>마저 관광하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.badgeBoxButton} onPress={onGoToBadgeBox} activeOpacity={0.8}>
              <Text style={styles.badgeBoxButtonText}>배지함으로 이동하기</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}