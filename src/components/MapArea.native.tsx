import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapArea({ location, errorMsg, filteredPlaces }: any) {
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {errorMsg || '지도와 위치를 불러오는 중입니다...'}
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true}
    >
      {filteredPlaces.map((place: any) => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.lat, longitude: place.lng }}
          title={place.name}
          description={place.category}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});