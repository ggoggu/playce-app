import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CourseNode } from '../constants/CourseData';
import { styles } from './PlaceInfoCard.styles'; // 분리한 스타일 가져오기

interface PlaceInfoCardProps {
  node: CourseNode | null;
  onClose: () => void;
}

export default function PlaceInfoCard({ node, onClose }: PlaceInfoCardProps) {
  // 선택된 노드가 없으면 아무것도 렌더링하지 않음 (안전 장치)
  if (!node) return null;

  return (
    <View style={styles.cardContainer} pointerEvents="box-none">
      <View style={styles.card}>
        {/* 장소 고유 건물 일러스트 이미지 영역 */}
        <View style={styles.imageWrapper}>
          <Image source={node.images.building} style={styles.image} resizeMode="contain" />
        </View>
        
        {/* 텍스트 정보 영역 */}
        <View style={styles.infoWrapper}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{node.placeName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {node.description}
          </Text>
        </View>
      </View>
    </View>
  );
}