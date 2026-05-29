import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function MapArea({ location, errorMsg, filteredPlaces }: any) {
  // 🌟 핵심 1: 지도 스크립트가 다 다운로드되었는지 기억하는 상태값
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // ==========================================
  // [1단계] 네이버 지도 스크립트 '다운로드'만 전담
  // ==========================================
  useEffect(() => {
    const scriptId = 'naver-map-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      // 🚨 아래 글자를 지우고 실제 Client ID를 꼭 넣어주세요!
      script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=a5r7ydgths";
      script.async = true;
      document.head.appendChild(script);

      // 다운로드가 '완료'되면 상태를 true로 변경
      script.onload = () => {
        setIsMapLoaded(true);
      };
    } else {
      // 이미 다운로드되어 있다면 바로 true로 변경 (새로고침 대비)
      setIsMapLoaded(true);
    }
  }, []); // 빈 배열([])을 넣어 컴포넌트가 처음 켜질 때 딱 한 번만 실행되게 합니다.

  // ==========================================
  // [2단계] 다운로드 완료 확인 후 '지도 그리기' 전담
  // ==========================================
  useEffect(() => {
    // 스크립트가 안 받아졌거나, 네이버 객체가 준비 안 됐으면 그리지 않고 대기!
    if (!isMapLoaded) return;
    const naver = (window as any).naver;
    if (!naver || !naver.maps) return;

    // 위치 정보 가져오기 (권한 대기 중이면 수원 화성을 기본값으로)
    const lat = location ? location.coords.latitude : 37.288;
    const lng = location ? location.coords.longitude : 127.019;

    const mapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 15
    };
    
    const map = new naver.maps.Map('web-map', mapOptions);
    
    // 필터링된 마커 데이터 뿌려주기
    filteredPlaces.forEach((place: any) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(place.lat, place.lng),
        map: map,
        title: place.name
      });
    });

  // 🌟 핵심 2: 스크립트 완료 상태(isMapLoaded)나, 내 위치(location)가 업데이트될 때만 안전하게 재실행됩니다.
  }, [isMapLoaded, location, filteredPlaces]); 

  // 위치 권한 거부 시 메시지 표시
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  loadingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  }
});