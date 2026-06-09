// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomNav from '../components/BottomNav'; // 🌟 기존 하단바
import ProfileSheetBackground from '../components/profile/ProfileSheetBackground';


import { useProfile } from '../hooks/useProfile';
import { styles } from './ProfileScreen.styles';

export default function ProfileScreen() {
  // 🌟 View에서는 훅에서 던져주는 데이터와 함수만 받아서 씁니다.
  const { 
    userInfo,
    badges,               // 🌟 배지 데이터 배열
    acquiredBadgeCount, 
    handleEditProfile, 
    handleScanQR, 
    handleDeleteTag,
    bottomSheetRef,
    snapPoints
  } = useProfile();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- 상단 고정 영역 --- */}
      <View style={styles.topSection}>
        
        {/* 아바타 & 닉네임 */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <Text style={styles.nickname}>{userInfo.nickname}</Text>
        
        <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditProfile} activeOpacity={0.7}>
          <Text style={styles.editProfileText}>내 정보 수정</Text>
        </TouchableOpacity>

        {/* 태그 관리 카드 */}
        <View style={styles.tagCard}>
          <View style={styles.tagCardHeader}>
            <Text style={styles.tagCardTitle}>태그관리</Text>
            
            {/* 연결 상태 표시 */}
            <View style={styles.tagStatusRow}>
              <View style={styles.tagStatusBox}>
                <Text style={styles.tagStatusText}>태그 연결</Text>
              </View>
              {userInfo.isTagConnected && (
                <Text style={styles.tagConnectedText}>연결</Text>
              )}
            </View>
          </View>

          {/* 스캔 및 삭제 버튼 */}
          <TouchableOpacity style={styles.qrButton} onPress={handleScanQR} activeOpacity={0.8}>
            <Text style={styles.qrButtonText}>QR 스캔하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTag} activeOpacity={0.8}>
            <Text style={styles.deleteButtonText}>태그 삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* 🌟 3단계에서 이 아래에 드래그 바텀 시트가 추가될 예정입니다. */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // 처음 화면 진입 시 snapPoints의 첫 번째('45%') 위치에 멈춤
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.sheetIndicator} // 상단 둥근 손잡이
        backgroundComponent={ProfileSheetBackground} // 그라데이션 배경 적용
        style={styles.sheetContainer}
      >
        {/* 시트 내부가 길어지면 드래그와 스크롤이 자연스럽게 연동되는 스크롤 뷰 */}
        <BottomSheetScrollView 
          contentContainerStyle={styles.sheetContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 피그마의 '프로필' 타이틀 텍스트 (위 화살표 아이콘 영역) */}
          <Text style={styles.sheetTitle}>탐험 스탯</Text>
          
          <View style={styles.statSection}>
            <View style={styles.statHeaderRow}>
              <View style={styles.statTag}>
                <Text style={styles.statTagText}>탐험 달성률</Text>
              </View>
              <Text style={styles.statSubText}>
                현재 {userInfo.nickname}님의 코스 진행률이에요
              </Text>
            </View>
            
            {/* 진행률 바 */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${userInfo.progressRate}%` }]} />
              <Text style={styles.progressText}>진행률 {userInfo.progressRate}%</Text>
            </View>
          </View>

          <View style={styles.statSection}>
            <Text style={styles.badgeSectionTitle}>
              활동 배지 ({acquiredBadgeCount}개)
            </Text>
            
            <View style={styles.badgeGrid}>
              {badges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                  
                  {/* 동적 스타일 적용: 획득 여부에 따라 원형 배경과 그림자가 바뀜 */}
                  <View style={[
                    styles.badgeCircle,
                    badge.isAcquired ? styles.badgeCircleActive : styles.badgeCircleInactive
                  ]}>
                    {badge.isAcquired ? (
                      // 🌟 획득한 배지: 추후 에셋 이미지가 준비되면 Image 컴포넌트 주석 해제 후 사용
                      // <Image source={require(`../../assets/images/badges/${badge.id}.png`)} style={{ width: 52, height: 52 }} resizeMode="contain" />
                      <Text style={{ fontSize: 40 }}>🏅</Text> // 임시 이모지
                    ) : (
                      // 미획득 상태
                      <Text style={styles.badgeEmptyText}>미획득</Text>
                    )}
                  </View>
                  
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>
          

        </BottomSheetScrollView>
      </BottomSheet>


      {/* 하단 네비게이션 바 */}
      <View pointerEvents="box-none" style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 20 }}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}