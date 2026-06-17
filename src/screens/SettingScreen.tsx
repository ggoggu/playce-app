import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './SettingScreen.styles';
import { colors } from '../styles/theme';
import BottomNav from '../components/BottomNav';
import { ArrowRightIcon, ProfileCharacterIcon } from '../components/icons/SettingIcons';
import { useSettingLogic } from '../hooks/useSettingLogic';

type SettingPage = 'main' | 'voice' | 'language' | 'location' | 'faq';

const SettingMenuRow = ({ label, value, onPress }: { label: string; value?: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.rowContainer} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowValueGroup}>
      {value && <Text style={styles.rowValueText}>{value}</Text>}
      <ArrowRightIcon color={colors.black} size={16} />
    </View>
  </TouchableOpacity>
);

const SettingToggleRow = ({
  label,
  description,
  isEnabled,
  onToggle,
}: {
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: (val: boolean) => void;
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

export default function SettingScreen() {
  const {
    isProximityAlertOn,
    isHapticOn,
    selectedVoice,
    selectedLanguage,
    setSelectedVoice,
    setSelectedLanguage,
    toggleProximityAlert,
    toggleHaptic,
    handleResetCourse,
  } = useSettingLogic();
  const [page, setPage] = useState<SettingPage>('main');
  const [resetVisible, setResetVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const renderHeader = (title = '환경설정') => (
    <View style={localStyles.subHeader}>
      {page !== 'main' && (
        <TouchableOpacity onPress={() => setPage('main')} activeOpacity={0.75}>
          <Text style={localStyles.backText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={localStyles.subHeaderTitle}>{title}</Text>
      <View style={localStyles.headerSpacer} />
    </View>
  );

  const renderMain = () => (
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>
        <View style={styles.profileImageCircle}>
          <ProfileCharacterIcon size={60} />
        </View>
        <Text style={styles.profileTitle}>환경설정</Text>
      </View>

      <Text style={styles.sectionTitle}>오디오</Text>
      <SettingMenuRow label="보이스 설정" value={selectedVoice} onPress={() => setPage('voice')} />
      <Text style={styles.rowDescription}>듣고 싶은 보이스를 직접 설정하세요.</Text>
      <SettingMenuRow label="언어 설정" value={selectedLanguage} onPress={() => setPage('language')} />

      <View style={styles.divider} />

      <SettingMenuRow label="백그라운드 위치 권한" value="항상허용" onPress={() => setPage('location')} />
      <SettingToggleRow
        label="근접 알림 설정"
        description="앱을 켜두지 않아도 코스 내 장소에 접근했을 때 푸시 알림을 받을지 설정하세요."
        isEnabled={isProximityAlertOn}
        onToggle={toggleProximityAlert}
      />
      <SettingToggleRow
        label="진동 / 햅틱 설정"
        description="태그 인식, 코스 완료 했을 때 느껴지는 진동효과를 설정하세요."
        isEnabled={isHapticOn}
        onToggle={toggleHaptic}
      />

      <View style={styles.divider} />

      <SettingMenuRow label="여정 초기화" onPress={() => setResetVisible(true)} />
      <SettingMenuRow label="자주 묻는 질문(FAQ)" onPress={() => setPage('faq')} />
    </ScrollView>
  );

  const renderChoicePage = (
    title: string,
    options: { label: string; value: string }[],
    selected: string,
    onSelect: (value: string) => void,
  ) => (
    <View style={localStyles.subPage}>
      {renderHeader(title)}
      <View style={localStyles.choiceGrid}>
        {options.map((option) => {
          const active = selected === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[localStyles.choiceCard, active && localStyles.choiceCardActive]}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.82}
            >
              <Text style={[localStyles.choiceText, active && localStyles.choiceTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderLocation = () => (
    <View style={localStyles.subPage}>
      {renderHeader('백그라운드 위치권한')}
      <View style={localStyles.permissionCard}>
        <Text style={localStyles.permissionTitle}>위치 권한을 항상 허용해주세요</Text>
        <Text style={localStyles.permissionDesc}>
          앱을 켜두지 않아도 코스 내 장소와 가까워졌을 때 안내를 받을 수 있습니다.
        </Text>
        <Text style={localStyles.permissionStep}>1. 설정에서 위치 권한을 선택</Text>
        <Text style={localStyles.permissionStep}>2. 항상 허용으로 변경</Text>
        <Text style={localStyles.permissionStep}>3. PLAYCE로 돌아와 여정을 계속 진행</Text>
      </View>
    </View>
  );

  const faqs = [
    ['태그를 분실했어요. 어떻게 해야 하나요?', '프로필의 태그 관리에서 기존 태그를 삭제하고 새 태그 QR을 스캔해 다시 연결할 수 있습니다.'],
    ['오디오 가이드는 언제 재생되나요?', '코스 장소에 도착해 RFID 태그가 인식되면 해당 장소의 오디오 가이드가 열립니다.'],
    ['코스 진행률은 어디에서 확인하나요?', '코스 진행 화면과 프로필 탐험 스탯에서 현재 진행률을 확인할 수 있습니다.'],
    ['언어와 보이스는 바꿀 수 있나요?', '환경설정에서 한국어, 영어, 중국어, 일본어와 남성/여성 보이스를 선택할 수 있습니다.'],
  ];

  const renderFaq = () => (
    <View style={localStyles.subPage}>
      {renderHeader('자주 묻는 질문(FAQ)')}
      <ScrollView contentContainerStyle={localStyles.faqList}>
        {faqs.map(([question, answer], index) => {
          const open = openFaq === index;
          return (
            <TouchableOpacity key={question} style={localStyles.faqItem} onPress={() => setOpenFaq(open ? -1 : index)} activeOpacity={0.85}>
              <Text style={localStyles.faqQuestion}>{question}</Text>
              {open && <Text style={localStyles.faqAnswer}>{answer}</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {page === 'main' && renderMain()}
      {page === 'voice' &&
        renderChoicePage(
          '보이스 설정',
          [
            { label: '남성', value: '남성' },
            { label: '여성', value: '여성' },
          ],
          selectedVoice,
          (value) => {
            setSelectedVoice(value);
            setPage('main');
          },
        )}
      {page === 'language' &&
        renderChoicePage(
          '언어 설정',
          [
            { label: '한국어', value: '한국어' },
            { label: 'English', value: 'English' },
            { label: '中文', value: '中文' },
            { label: '日本語', value: '日本語' },
          ],
          selectedLanguage,
          (value) => {
            setSelectedLanguage(value);
            setPage('main');
          },
        )}
      {page === 'location' && renderLocation()}
      {page === 'faq' && renderFaq()}

      <BottomNav />
      <Modal visible={resetVisible} transparent animationType="fade" onRequestClose={() => setResetVisible(false)}>
        <View style={localStyles.modalBackdrop}>
          <View style={localStyles.resetDialog}>
            <Text style={localStyles.resetTitle}>여정을 초기화 하시겠습니까?</Text>
            <Text style={localStyles.resetDesc}>진행 중인 코스 기록이 초기화됩니다.</Text>
            <TouchableOpacity
              style={localStyles.resetDanger}
              onPress={() => {
                setResetVisible(false);
                handleResetCourse();
              }}
              activeOpacity={0.85}
            >
              <Text style={localStyles.resetDangerText}>초기화하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.resetCancel} onPress={() => setResetVisible(false)} activeOpacity={0.85}>
              <Text style={localStyles.resetCancelText}>취소하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  subHeader: {
    height: 64,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 24,
    color: '#8A8A8A',
    fontWeight: '800',
  },
  subHeaderTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '900',
  },
  headerSpacer: {
    width: 24,
  },
  subPage: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 34,
    paddingTop: 70,
    gap: 16,
  },
  choiceCard: {
    width: '47%',
    height: 126,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceCardActive: {
    backgroundColor: '#1BC5CC',
  },
  choiceText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  permissionCard: {
    marginHorizontal: 28,
    marginTop: 42,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
  },
  permissionDesc: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 20,
    color: '#8A8A8A',
  },
  permissionStep: {
    marginTop: 14,
    fontSize: 13,
    color: '#000000',
    fontWeight: '700',
  },
  faqList: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 132,
    gap: 12,
  },
  faqItem: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  faqQuestion: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '900',
  },
  faqAnswer: {
    color: '#8A8A8A',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  resetDialog: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  resetTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  resetDesc: {
    color: '#8A8A8A',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
  },
  resetDanger: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E26D5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  resetDangerText: {
    color: '#E26D5A',
    fontWeight: '900',
    fontSize: 15,
  },
  resetCancel: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  resetCancelText: {
    color: '#8A8A8A',
    fontWeight: '900',
    fontSize: 15,
  },
});
