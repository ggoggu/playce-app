// src/components/CourseCompletePopup.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { styles } from './CourseCompletePopup.styles';

interface CourseCompletePopupProps {
  visible: boolean;
  onContinue: () => void; // 마저 관광하기 눌렀을 때
  onGoToBadgeBox?: () => void; // 배지함으로 이동하기 눌렀을 때
}

export default function CourseCompletePopup({ visible, onContinue, onGoToBadgeBox }: CourseCompletePopupProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          <View style={styles.topSection}>
            <Text style={styles.mainTitle}>첫번째 코스를{'\n'}모두 둘러보았어요</Text>
            
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