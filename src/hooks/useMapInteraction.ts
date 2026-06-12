import { useState, useCallback } from 'react';
import { CourseNode } from '../constants/CourseData';

export function useMapInteraction() {
  const [selectedNode, setSelectedNode] = useState<CourseNode | null>(null);

  // 마커를 클릭했을 때 실행할 로직
  const handleMarkerSelect = useCallback((node: CourseNode) => {
    setSelectedNode(node);
  }, []);

  // 장소 정보 카드를 닫을 때 실행할 로직
  const handleCloseCard = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return {
    selectedNode,
    handleMarkerSelect,
    handleCloseCard,
  };
}