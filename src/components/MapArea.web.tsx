import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { CourseNode } from '../constants/CourseData';
import { useCourseDirections } from '../hooks/useCourseDirections'; 
import { colors } from '../styles/theme';
import { styles } from './MapArea.styles'; // 🌟 분리된 스타일 임포트

interface MapAreaProps {
  location: any;
  errorMsg: string | null;
  filteredPlaces?: any[];
  courseNodes?: CourseNode[]; 
  onMarkerPress?: (node: CourseNode) => void; 
}

export default function MapArea({ location, errorMsg, filteredPlaces = [], courseNodes = [], onMarkerPress }: MapAreaProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null); 
  
  const { routeCoordinates, isRouteLoading } = useCourseDirections(courseNodes);

  useEffect(() => {
    // 네이버 맵 스크립트 로드 로직 (이전과 동일)
    const scriptId = 'naver-map-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=a5r7ydgths";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => setIsMapLoaded(true);
    } else {
      setIsMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isMapLoaded) return;
    const naver = (window as any).naver;
    if (!naver || !naver.maps) return;

    const lat = courseNodes.length > 0 ? courseNodes[0].lat : (location ? location.coords.latitude : 37.288);
    const lng = courseNodes.length > 0 ? courseNodes[0].lng : (location ? location.coords.longitude : 127.019);

    const map = new naver.maps.Map('web-map', {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 15
    });
    setMapInstance(map);

    filteredPlaces.forEach((place: any) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map: map,
        title: place.name
      });
    });

    courseNodes.forEach((node: CourseNode) => {
      const imageUri = Image.resolveAssetSource(node.images.building).uri;
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(node.lat, node.lng),
        map: map,
        icon: { url: imageUri, scaledSize: new naver.maps.Size(60, 60) }
      });

      if (onMarkerPress) {
        naver.maps.Event.addListener(marker, 'click', () => onMarkerPress(node));
      }
    });
  }, [isMapLoaded, location, filteredPlaces, courseNodes]); 

  useEffect(() => {
    const naver = (window as any).naver;
    if (!mapInstance || !naver || routeCoordinates.length === 0) return;

    const polylinePath = routeCoordinates.map(coord => new naver.maps.LatLng(coord.latitude, coord.longitude));
    
    const polyline = new naver.maps.Polyline({
      map: mapInstance,
      path: polylinePath,
      strokeColor: colors.point,
      strokeWeight: 5,
      strokeStyle: 'shortdash'
    });

    return () => {
      polyline.setMap(null);
    };
  }, [mapInstance, routeCoordinates]);

  if (!location && errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <div id="web-map" style={{ width: '100%', height: '100%' }} />
      {isRouteLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>경로 탐색 중...</Text>
        </View>
      )}
    </View>
  );
}