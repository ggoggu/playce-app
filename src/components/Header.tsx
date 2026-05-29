import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>로고</Text>
      </View>
      <Text style={styles.mainTitle}>PLAYCE</Text>
      <Text style={styles.subTitle}>태그를 받아, 나만의 관광가이드와 함께 구경하세요!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoCircle: {
    width: 53.5,
    height: 53.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 26.75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  mainTitle: {
    fontSize: 20,
    color: '#FFB826',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '500',
  },
});