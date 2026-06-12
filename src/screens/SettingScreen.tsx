// src/screens/SettingScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { styles } from './SettingScreen.styles';
import { colors } from '../styles/theme';
import BottomNav from '../components/BottomNav';
import { ArrowRightIcon, ProfileCharacterIcon } from '../components/icons/SettingIcons'; // 🌟 프로필 아이콘 추가 임포트
import { useSettingLogic } from '../hooks/useSettingLogic';

// --- 재사용 UI 컴포넌트 ---
const SettingMenuRow = ({ label, value, onPress }: { label: string, value?: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.rowContainer} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowValueGroup}>
      {value && <Text style={styles.rowValueText}>{value}</Text>}
      <ArrowRightIcon color={colors.black} size={16} /> 
    </View>
  </TouchableOpacity>
);

const SettingToggleRow = ({ 
  label, description, isEnabled, onToggle 
}: { 
  label: string, description: string, isEnabled: boolean, onToggle: (val: boolean) => void 
}) => (
  <View>
    <View style={styles.rowContainer}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        trackColor={{ false: colors.grayLight, true: colors.point }}
        thumbColor={colors.white}
        onValueChange={onToggle}
        value={isEnabled}
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
      />
    </View>
    <Text style={styles.rowDescription}>{description}</Text>
  </View>
);

// --- 메인 화면 컨테이너 ---
export default function SettingScreen() {
  const {
    isProximityAlertOn,
    isHapticOn,
    selectedVoice,
    selectedLanguage,
    toggleProximityAlert,
    toggleHaptic,
    handleResetCourse,
    handleFAQ,
  } = useSettingLogic();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* 1. 프로필 영역 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageCircle}>
            {/* 🌟 드디어 완성된 프로필 아이콘 삽입! */}
            <ProfileCharacterIcon size={60} />
          </View>
          <Text style={styles.profileTitle}>환경설정</Text>
        </View>

        {/* 2. 오디오 설정 영역 */}
        <Text style={styles.sectionTitle}>오디오</Text>
        <SettingMenuRow label="보이스 설정" value={selectedVoice} />
        <Text style={styles.rowDescription}>듣고 싶은 보이스를 직접 설정하세요.</Text>
        <SettingMenuRow label="언어 설정" value={selectedLanguage} />

        <View style={styles.divider} />

        {/* 3. 권한 및 알림 설정 영역 */}
        <SettingMenuRow label="백그라운드 위치 권한" value="항상허용" />
        <SettingToggleRow 
          label="근접 알림 설정" 
          description="앱을 켜두지 않아도 코스 내 장소에 접근했을 때 푸시 알림을 받을지 설정하세요."
          isEnabled={isProximityAlertOn}
          onToggle={toggleProximityAlert}
        />
        <SettingToggleRow 
          label="진동 / 햅틱 설정" 
          description="태그 인식 , 코스 완료 했을 때 느껴지는 진동효과를 설정하세요."
          isEnabled={isHapticOn}
          onToggle={toggleHaptic}
        />

        <View style={styles.divider} />

        {/* 4. 기타 설정 영역 */}
        <SettingMenuRow label="여정 초기화" onPress={handleResetCourse} />
        <SettingMenuRow label="자주 묻는 질문(FAQ)" onPress={handleFAQ} />

      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}