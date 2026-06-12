import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'; 
import { CourseNode } from '../constants/CourseData';
import { useCourseDirections } from '../hooks/useCourseDirections'; 
import { colors } from '../styles/theme';
import { styles } from './MapArea.styles';

interface MapAreaProps {
  location: any;
  errorMsg: string | null;
  filteredPlaces?: any[];
  courseNodes?: CourseNode[]; 
  onMarkerPress?: (node: CourseNode) => void; 
}

const CustomCourseMarker = ({ node, onPress }: { node: CourseNode, onPress: () => void }) => {
  const [tracksView, setTracksView] = useState(true);

  useEffect(() => {
    // 0.8초 동안 안전하게 지도가 그려질 시간을 줍니다.
    const timer = setTimeout(() => {
      setTracksView(false); 
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Marker
      coordinate={{ latitude: node.lat, longitude: node.lng }}
      onPress={onPress}
      tracksViewChanges={tracksView} 
    >
      <View style={{ width: 65, height: 65, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          source={node.images.building} 
          style={{ width: 65, height: 65 }} 
          resizeMode="contain" 
          
          // 🌟🌟🌟 이 속성이 1/4 잘림 현상을 해결하는 안드로이드 전용 마법의 치트키입니다! 🌟🌟🌟
          // 지도 엔진이 배율을 뻥튀기하기 전에, 강제로 원본 사이즈를 65x65로 재계산(압축)해버립니다.
          resizeMethod="resize" 
          
          fadeDuration={0} 
        />
      </View>
    </Marker>
  );
};

export default function MapArea({ location, errorMsg, filteredPlaces = [], courseNodes = [], onMarkerPress }: MapAreaProps) {
  const { routeCoordinates, isRouteLoading } = useCourseDirections(courseNodes);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{errorMsg || '지도와 위치를 불러오는 중입니다...'}</Text>
      </View>
    );
  }

  const initialLat = courseNodes.length > 0 ? courseNodes[0].lat : location.coords.latitude;
  const initialLng = courseNodes.length > 0 ? courseNodes[0].lng : location.coords.longitude;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{ latitude: initialLat, longitude: initialLng, latitudeDelta: 0.03, longitudeDelta: 0.03 }}
        showsUserLocation={true}
      >
        {filteredPlaces.map((place: any) => (
          <Marker key={`place-${place.id}`} coordinate={{ latitude: place.lat, longitude: place.lng }} title={place.name} />
        ))}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={colors.point}
            strokeWidth={5}
            lineDashPattern={[10, 10]}
          />
        )}

        {courseNodes.map((node: CourseNode) => (
          <Marker 
            key={`course-wrapper-${node.id}`} 
            coordinate={{ latitude: node.lat, longitude: node.lng }}
            onPress={() => onMarkerPress && onMarkerPress(node)} 
            image={node.images.marker}
          />
        ))}
      </MapView>

      {isRouteLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>코스 경로를 탐색 중입니다...</Text>
        </View>
      )}
    </View>
  );
}