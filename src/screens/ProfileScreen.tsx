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
            <View style={styles.statHeaderRow}>
              <View style={styles.statTag}>
                <Text style={styles.statTagText}>탐험 시간</Text>
              </View>
              <Text style={styles.statSubText}>
                {userInfo.nickname}님의 현재까지의 체류시간이에요
              </Text>
              <Text style={styles.timeValueText}>{userInfo.playTimeMinutes}분</Text>
            </View>
          </View>

          <View style={styles.statSection}>
             {/* 다음 단계에서 배지 Grid가 들어갈 자리입니다. */}
          </View>
          

          <View style={{ height: 500, alignItems: 'center' }}>
            <Text style={{ color: '#4C4C4C' }}>여기에 탐험 스탯과 배지 목록이 채워집니다.</Text>
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