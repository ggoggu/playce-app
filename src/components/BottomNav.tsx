import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BOTTOM_NAV_LIST } from '../hooks/useMainPresenter';

export default function BottomNav({ activeTab, onSelectTab }: any) {
  return (
    <View style={styles.bottomNavWrapper} pointerEvents="box-none">
      <View style={styles.bottomNavContainer}>
        {BOTTOM_NAV_LIST.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity 
              key={index} 
              style={styles.navItem}
              onPress={() => onSelectTab(tab)}
            >
              <View style={[styles.navIconPlaceholder, isActive && { borderColor: '#FFB826' }]} />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 362,
    height: 83,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    borderTopWidth: 2,
    borderColor: '#FAFAFA',
    paddingHorizontal: 27,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconPlaceholder: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    marginBottom: 3,
  },
  navText: {
    fontSize: 8,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '400',
  },
  navTextActive: {
    color: '#FFB826',
  }
});