import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>👤</Text>
        </View>
        <Text style={styles.title}>내 프로필</Text>
        <Text style={styles.subTitle}>회원 정보 및 다이어리 기능을 준비 중입니다.</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9E6' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconText: { fontSize: 32 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFB826', marginBottom: 8 },
  subTitle: { fontSize: 14, color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center' },
});