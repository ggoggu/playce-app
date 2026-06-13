import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useManualEntry } from '../hooks/useManualEntry';
import { styles } from './ManualEntryPopup.styles';

interface ManualEntryPopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function ManualEntryPopup({ visible, onClose }: ManualEntryPopupProps) {
  // 🌟 3단계에서 만든 로직을 가져옵니다.
  const { inputValue, isSubmitEnabled, handleInputChange, handleSubmit } = useManualEntry(onClose);

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      {/* 바깥 영역을 터치하면 키보드가 내려가도록 설정 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          
          {/* 키보드가 올라올 때 팝업이 위로 자연스럽게 밀려 올라가도록 처리 */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          >
            <TouchableWithoutFeedback>
              <View style={styles.popupContainer}>
                
                {/* 1. 일러스트레이션 (SVG) 영역 */}
                <View style={styles.imageWrapper}>
                  {/* 🌟 팁: 올려주신 SVG 코드는 react-native-svg를 이용해 별도 컴포넌트로 만들거나,
                      피그마에서 PNG로 추출하여 <Image>로 넣으시면 가장 깔끔합니다. */}
                  <View style={{ width: 100, height: 80, backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                    <Text style={{ fontSize: 10, color: '#CDCDCD' }}>SVG 이미지 영역</Text>
                  </View>
                </View>

                {/* 2. 타이틀 */}
                <Text style={styles.title}>직접 입력하기</Text>

                {/* 3. 입력창 영역 */}
                <View style={styles.inputSection}>
                  <TextInput
                    style={styles.inputBox}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder="코드를 입력하세요"
                    placeholderTextColor="#CDCDCD"
                    autoCapitalize="characters" // 고유 코드가 주로 대문자일 경우를 대비
                    maxLength={20} // 코드 최대 길이 제한 (필요에 따라 수정)
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit} // 키보드에서 '완료'를 눌러도 제출되도록 설정
                  />
                  <Text style={styles.guideText}>
                    고유 코드(영문/숫자)를 직접 입력하여{'\n'}여정을 시작하세요
                  </Text>
                </View>

                {/* 4. 등록하기 버튼 */}
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity 
                    style={[styles.submitButton, isSubmitEnabled && styles.submitButtonActive]}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                    disabled={!isSubmitEnabled} // 값이 없으면 터치되지 않게 막음
                  >
                    <Text style={styles.submitButtonText}>등록하기</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}