// src/components/profile/ProfileSheetBackground.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileSheetBackground({ style }: BottomSheetBackgroundProps) {
  return (
    <LinearGradient
      // 피그마 CSS: background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, #FFB826 100%);
      colors={['rgba(255, 255, 255, 0.2)', '#FFB826']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[style, styles.container]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // 피그마 CSS: border-radius: 32px 32px 0px 0px;
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // 피그마 CSS: box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10, // 안드로이드용 그림자
  },
});