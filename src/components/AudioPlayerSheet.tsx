// src/components/AudioPlayerSheet.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../screens/AudioGuideScreen.styles';
import { PlayIcon, PauseIcon } from './icons/AudioIcons';

interface AudioPlayerSheetProps {
  totalNodes: number;         // 🌟 이 테마의 전체 코스 개수
  currentNodeIndex: number;   // 🌟 현재 재생 중인 코스 번호
  completedNodes: number[];   // 🌟 완료된 코스 목록
  isPlaying: boolean;
  isFinished: boolean;
  positionStr: string;
  durationStr: string;
  progressRatio: number;
  onTogglePlay: () => void;
  placeName: string;          // 🌟 장소 이름 동적 렌더링
}

export default function AudioPlayerSheet({
  totalNodes,
  currentNodeIndex,
  completedNodes,
  isPlaying,
  isFinished,
  positionStr,
  durationStr,
  progressRatio,
  onTogglePlay,
  placeName,
}: AudioPlayerSheetProps) {
  
  // 1부터 totalNodes까지의 배열 생성 (예: totalNodes가 3이면 [1, 2, 3])
  const nodeArray = Array.from({ length: totalNodes }, (_, i) => i + 1);

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.sheetInner}>
        
        {/* 🌟 가변형 코스 순서 노드 */}
        <View style={styles.nodeContainer}>
          {nodeArray.map((num) => {
            // 이미 완료된 코스이거나, 현재 재생 중인데 끝난(isFinished) 상태면 파란색(Active)
            const isCompleted = completedNodes.includes(num) || (num === currentNodeIndex && isFinished);
            
            return (
              <View 
                key={num} 
                style={[
                  styles.nodeCircle, 
                  isCompleted ? styles.nodeCircleActive : styles.nodeCircleInactive
                ]}
              >
                <Text style={styles.nodeText}>{num}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.playerBox}>
          <View style={styles.playerTitleGroup}>
            <Text style={styles.playerTitle}>오디오 가이드</Text>
            {/* 🌟 장소 이름 동적 적용 */}
            <Text style={styles.playerSubTitle}>{placeName}을(를) 나만의 관광가이드와 함께 둘러보세요!</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{positionStr}</Text>
              <Text style={styles.timeText}>{durationStr}</Text>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity activeOpacity={0.6}><Text style={{ color: '#8A8A8A', fontSize: 16 }}>⏪</Text></TouchableOpacity>
            
            <TouchableOpacity style={styles.playButtonCircle} onPress={onTogglePlay} activeOpacity={0.8}>
              {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6}><Text style={{ color: '#8A8A8A', fontSize: 16 }}>⏩</Text></TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}