import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { styles } from './CoursePopup.styles'; // 분리한 스타일 불러오기

interface CoursePopupProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  title: string;
  coursePath: string;
  imageSource?: any;
}

export default function CoursePopup({ visible, onClose, onStart, title, coursePath, imageSource }: CoursePopupProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          {imageSource && (
            <Image source={imageSource} style={styles.popupImage} resizeMode="contain" />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>
              <Text style={styles.highlightText}>{title}</Text>를 선택하셨습니다!
            </Text>
            <Text style={styles.mainTitle}>함께 여정을 떠나시겠습니까?</Text>
          </View>

          <View style={styles.courseBox}>
            <Text style={styles.courseLabel}>코스경로</Text>
            <Text style={styles.coursePath}>{coursePath}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.startButton} onPress={onStart}>
              <Text style={styles.startButtonText}>시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.backButtonText}>뒤로가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}