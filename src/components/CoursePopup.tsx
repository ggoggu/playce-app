import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

interface CoursePopupProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  title: string;          // 예: "역사테마"
  coursePath: string;     // 예: "화성행궁 - ..."
  imageSource?: any;      // 🌟 선택사항(옵션): 이미지가 있으면 보여주고, 없으면 안 보여줌
}

export default function CoursePopup({ visible, onClose, onStart, title, coursePath, imageSource }: CoursePopupProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          {/* 🌟 이미지가 있을 때만 렌더링 */}
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
            <TouchableOpacity style={styles.startButton} onPress={onStart}><Text style={styles.startButtonText}>시작하기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onClose}><Text style={styles.backButtonText}>뒤로가기</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 314.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 33,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  popupImage: {
    width: 88.22,
    height: 70.75,
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 27,
  },
  subTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  highlightText: {
    color: '#1BC5CC',
  },
  mainTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 20,
    color: '#000000',
  },
  courseBox: {
    width: 250.5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 12,
  },
  courseLabel: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 9,
    color: '#8A8A8A',
    marginBottom: 8,
  },
  coursePath: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#8A8A8A',
    textAlign: 'center',
  },
  buttonContainer: {
    width: 250.5,
    gap: 12, // 최신 React Native에서 지원하는 gap (버튼 사이 간격)
  },
  startButton: {
    height: 44,
    backgroundColor: '#FFB826',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 12,
  },
  startButtonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  backButton: {
    height: 44,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
    color: '#8A8A8A',
  },
});