// src/screens/ProfileScreen.tsx
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileSheetBackground from '../components/profile/ProfileSheetBackground';
import type { Badge } from '../hooks/useProfile';
import { useProfile } from '../hooks/useProfile';
import { styles } from './ProfileScreen.styles';

export default function ProfileScreen() {
  const {
    userInfo,
    badges,
    acquiredBadgeCount,
    handleEditProfile,
    handleScanQR,
    handleDeleteTag,
    bottomSheetRef,
    snapPoints,
  } = useProfile();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(userInfo.nickname);

  const openEditProfile = () => {
    setNicknameInput(userInfo.nickname);
    setEditVisible(true);
  };

  const saveProfile = () => {
    handleEditProfile(nicknameInput);
    setEditVisible(false);
  };

  const confirmDeleteTag = () => {
    handleDeleteTag();
    setDeleteVisible(false);
  };

  const sheetContent = (
    <>
      <Text style={styles.sheetTitle}>탐험 스탯</Text>

      <View style={styles.statSection}>
        <View style={styles.statHeaderRow}>
          <View style={styles.statTag}>
            <Text style={styles.statTagText}>탐험 달성률</Text>
          </View>
          <Text style={styles.statSubText}>현재 {userInfo.nickname}님의 코스 진행률이에요</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${userInfo.progressRate}%` }]} />
          <Text style={styles.progressText}>진행률 {userInfo.progressRate}%</Text>
        </View>
      </View>

      <View style={styles.statSection}>
        <Text style={styles.badgeSectionTitle}>활동 배지 ({acquiredBadgeCount}개)</Text>

        <View style={styles.badgeGrid}>
          {badges.map((badge) => (
            <TouchableOpacity key={badge.id} style={styles.badgeItem} onPress={() => setSelectedBadge(badge)} activeOpacity={0.86}>
              <View style={[styles.badgeCircle, badge.isAcquired ? styles.badgeCircleActive : styles.badgeCircleInactive]}>
                {badge.image ? (
                  <Image
                    source={badge.image}
                    style={[profileModalStyles.badgeImage, !badge.isAcquired && profileModalStyles.lockedBadgeImage]}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.badgeEmptyText}>미획득</Text>
                )}
              </View>

              <Text style={styles.badgeName}>{badge.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.avatarCircle}>
          <Image source={require('../../assets/images/onboarding/mascot.png')} style={profileModalStyles.avatarImage} resizeMode="contain" />
        </View>
        <Text style={styles.nickname}>{userInfo.nickname}</Text>

        <TouchableOpacity style={styles.editProfileBtn} onPress={openEditProfile} activeOpacity={0.7}>
          <Text style={styles.editProfileText}>내 정보 수정</Text>
        </TouchableOpacity>

        <View style={styles.tagCard}>
          <View style={styles.tagCardHeader}>
            <Text style={styles.tagCardTitle}>태그관리</Text>

            <View style={styles.tagStatusRow}>
              <View style={styles.tagStatusBox}>
                <Text style={styles.tagStatusText}>태그 연결</Text>
              </View>
              {userInfo.isTagConnected && <Text style={styles.tagConnectedText}>연결</Text>}
              {!userInfo.isTagConnected && <Text style={styles.tagPendingText}>{userInfo.registrationStatus}</Text>}
            </View>
          </View>

          <Text style={styles.tagMetaText}>
            {userInfo.epc ? `EPC ${userInfo.epc}` : `App ${userInfo.appInstanceId || '초기화 중'}`}
          </Text>
          {userInfo.registrationError && (
            <Text style={styles.tagErrorText} numberOfLines={2}>
              {userInfo.registrationError}
            </Text>
          )}

          <TouchableOpacity style={styles.qrButton} onPress={handleScanQR} activeOpacity={0.8}>
            <Text style={styles.qrButtonText}>QR 스캔하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={() => setDeleteVisible(true)} activeOpacity={0.8}>
            <Text style={styles.deleteButtonText}>태그 삭제</Text>
          </TouchableOpacity>
        </View>
      </View>

      {Platform.OS === 'web' ? (
        <View style={[styles.sheetContainer, styles.webSheet]}>
          <View style={styles.sheetIndicator} />
          <ScrollView contentContainerStyle={styles.sheetContentContainer} showsVerticalScrollIndicator={false}>
            {sheetContent}
          </ScrollView>
        </View>
      ) : (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.sheetIndicator}
          backgroundComponent={ProfileSheetBackground}
          style={styles.sheetContainer}
        >
          <BottomSheetScrollView contentContainerStyle={styles.sheetContentContainer} showsVerticalScrollIndicator={false}>
            {sheetContent}
          </BottomSheetScrollView>
        </BottomSheet>
      )}

      

      <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
      <ProfileEditModal
        visible={editVisible}
        nickname={nicknameInput}
        onChangeNickname={setNicknameInput}
        onCancel={() => setEditVisible(false)}
        onSave={saveProfile}
      />
      <DeleteTagModal visible={deleteVisible} onCancel={() => setDeleteVisible(false)} onDelete={confirmDeleteTag} />
    </SafeAreaView>
  );
}

function BadgeDetailModal({ badge, onClose }: { badge: Badge | null; onClose: () => void }) {
  if (!badge) return null;
  return (
    <Modal visible={Boolean(badge)} transparent={false} animationType="slide" onRequestClose={onClose}>
      <View style={profileModalStyles.badgeDetail}>
        <TouchableOpacity onPress={onClose} style={profileModalStyles.backTextButton} activeOpacity={0.8}>
          <Text style={profileModalStyles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={profileModalStyles.badgeHeader}>활동배지</Text>
        <View style={profileModalStyles.badgeHero}>
          {badge.image && <Image source={badge.image} style={profileModalStyles.detailBadgeImage} resizeMode="contain" />}
        </View>
        <Text style={profileModalStyles.badgeTheme}>{badge.theme}</Text>
        <Text style={profileModalStyles.badgeTitle}>{badge.name}</Text>
        <Text style={profileModalStyles.badgeDescription}>{badge.description}</Text>
      </View>
    </Modal>
  );
}

function ProfileEditModal({
  visible,
  nickname,
  onChangeNickname,
  onCancel,
  onSave,
}: {
  visible: boolean;
  nickname: string;
  onChangeNickname: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={profileModalStyles.backdrop}>
        <View style={profileModalStyles.dialog}>
          <Text style={profileModalStyles.dialogTitle}>내 정보 수정</Text>
          <Text style={profileModalStyles.dialogLabel}>닉네임</Text>
          <TextInput
            value={nickname}
            onChangeText={onChangeNickname}
            style={profileModalStyles.input}
            placeholder="닉네임을 입력하세요"
            maxLength={12}
          />
          <TouchableOpacity style={profileModalStyles.primaryButton} onPress={onSave} activeOpacity={0.85}>
            <Text style={profileModalStyles.primaryButtonText}>완료</Text>
          </TouchableOpacity>
          <TouchableOpacity style={profileModalStyles.secondaryButton} onPress={onCancel} activeOpacity={0.85}>
            <Text style={profileModalStyles.secondaryButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function DeleteTagModal({ visible, onCancel, onDelete }: { visible: boolean; onCancel: () => void; onDelete: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={profileModalStyles.backdrop}>
        <View style={profileModalStyles.dialog}>
          <Text style={profileModalStyles.dialogTitle}>태그를 삭제하시겠습니까?</Text>
          <Text style={profileModalStyles.dialogDesc}>현재 연결된 태그 정보가 이 기기에서 해제됩니다.</Text>
          <TouchableOpacity style={profileModalStyles.dangerButton} onPress={onDelete} activeOpacity={0.85}>
            <Text style={profileModalStyles.dangerButtonText}>삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={profileModalStyles.secondaryButton} onPress={onCancel} activeOpacity={0.85}>
            <Text style={profileModalStyles.secondaryButtonText}>취소하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const profileModalStyles = StyleSheet.create({
  avatarImage: {
    width: 58,
    height: 58,
  },
  badgeImage: {
    width: 118,
    height: 118,
  },
  lockedBadgeImage: {
    opacity: 0.34,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  dialogTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  dialogLabel: {
    color: '#8A8A8A',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 8,
  },
  dialogDesc: {
    color: '#8A8A8A',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 12,
  },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFB826',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  dangerButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E26D5A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dangerButtonText: {
    color: '#E26D5A',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#8A8A8A',
    fontSize: 15,
    fontWeight: '900',
  },
  badgeDetail: {
    flex: 1,
    backgroundColor: '#EAF9F5',
    alignItems: 'center',
    paddingTop: 54,
    paddingHorizontal: 28,
  },
  backTextButton: {
    position: 'absolute',
    left: 24,
    top: 52,
  },
  backText: {
    color: '#8A8A8A',
    fontSize: 26,
    fontWeight: '700',
  },
  badgeHeader: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
  },
  badgeHero: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 72,
    shadowColor: '#FFB826',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 10,
  },
  detailBadgeImage: {
    width: 165,
    height: 165,
  },
  badgeTheme: {
    color: '#1BC5CC',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 34,
  },
  badgeTitle: {
    color: '#1BC5CC',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 6,
  },
  badgeDescription: {
    color: '#4C4C4C',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 18,
  },
});
