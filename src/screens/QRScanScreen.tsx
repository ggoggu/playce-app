import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { useQRScanner } from '../hooks/useQRScanner';
import { styles } from './QRScanScreen.styles';
import ManualEntryPopup from '../components/ManualEntryPopup';

export default function QRScanScreen() {
  // 🌟 3단계에서 만든 커스텀 훅에서 기능만 꺼내옵니다.
  const { hasPermission, scanned, handleBarcodeScanned, handleGoBack } = useQRScanner();

  const [isManualPopupVisible, setManualPopupVisible] = useState(false);


  // 권한 대기 중이거나 거부된 경우의 화면 처리
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.permissionFallback}>
          <Text style={styles.permissionTitle}>카메라 접근 권한이 필요합니다.</Text>
          <Text style={styles.permissionDescription}>
            권한이 없거나 웹 환경에서는 QR URL 또는 TAG 토큰을 직접 입력할 수 있어요.
          </Text>
          <TouchableOpacity 
            style={styles.permissionManualButton} 
            activeOpacity={0.7} 
            onPress={() => setManualPopupVisible(true)}
          >
            <Text style={styles.permissionManualText}>직접 입력하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
            <Text style={styles.permissionBackText}>뒤로 가기</Text>
          </TouchableOpacity>
        </View>

        <ManualEntryPopup 
          visible={isManualPopupVisible} 
          onClose={() => setManualPopupVisible(false)} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 1. 뒤로 가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack} activeOpacity={0.7}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* 2. 전체 화면 카메라 뷰 */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], // QR 코드만 스캔하도록 최적화
        }}
      />

      {/* 3. 스캔 영역 오버레이 (터치 무시) */}
      <View style={[styles.overlay, { pointerEvents: 'none' }]}>
        <View style={styles.scanBox}>
          {/* 상단 모서리 */}
          <View style={styles.cornerRow}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
          </View>
          {/* 하단 모서리 */}
          <View style={styles.cornerRow}>
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.guideText}>QR 코드를 사각형 안에 맞춰주세요</Text>
        </View>
      </View>

      {/* 4. 하단 흰색 안내 패널 */}
      <View style={styles.bottomSheet}>
        <Text style={styles.logoText}>PLAYCE</Text>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>QR 스캔</Text>
          <Text style={styles.subTitle}>화면에 띄워진 QR 코드를 찍고 여정을 시작해 보세요!</Text>

          <TouchableOpacity 
            style={styles.manualButton} 
            activeOpacity={0.7} 
            onPress={() => setManualPopupVisible(true)}
          >
            <Text style={styles.manualText}>카메라 인식이 안 되나요? [직접 입력하기]</Text>
          </TouchableOpacity>

        </View>
      </View>

      <ManualEntryPopup 
        visible={isManualPopupVisible} 
        onClose={() => setManualPopupVisible(false)} 
      />
    </View>
  );
}
