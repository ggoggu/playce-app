// src/components/AudioPlayerSheet.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../screens/AudioGuideScreen.styles';
import { PlayIcon, PauseIcon } from './icons/AudioIcons';

interface AudioPlayerSheetProps {
  isPlaying: boolean;
  isFinished: boolean;      // 🌟 재생 완료 상태 여부 (true일 때 1번 노드가 파란색으로 변경)
  positionStr: string;     // 현재 재생 시간 문자열 (ex: "0:00")
  durationStr: string;     // 오디오 전체 길이 문자열 (ex: "8:34")
  progressRatio: number;   // 진행률 비례값 (0 ~ 1)
  onTogglePlay: () => void;
}

export default function AudioPlayerSheet({
  isPlaying,
  isFinished,
  positionStr,
  durationStr,
  progressRatio,
  onTogglePlay,
}: AudioPlayerSheetProps) {
  return (
    <View style={styles.bottomSheet}>
      <View style={styles.sheetInner}>
        
        {/* 1~5번 코스 순서 표시 노드 */}
        <View style={styles.nodeContainer}>
          {/* 1번 장소 노드: 완료 여부(isFinished)에 따라 조건부 스타일 적용 */}
          <View style={[styles.nodeCircle, isFinished ? styles.nodeCircleActive : styles.nodeCircleInactive]}>
            <Text style={styles.nodeText}>1</Text>
          </View>
          
          {/* 2~5번 코스 노드 (미진행 상태이므로 고정 회색 처리) */}
          {[2, 3, 4, 5].map((num) => (
            <View key={num} style={[styles.nodeCircle, styles.nodeCircleInactive]}>
              <Text style={styles.nodeText}>{num}</Text>
            </View>
          ))}
        </View>

        {/* 오디오 가이드 재생 정보 및 컨트롤러 박스 */}
        <View style={styles.playerBox}>
          <View style={styles.playerTitleGroup}>
            <Text style={styles.playerTitle}>오디오 가이드</Text>
            <Text style={styles.playerSubTitle}>방화수류정을 나만의 관광가이드와 함께 둘러보세요!</Text>
          </View>

          {/* 타임라인 바 영역 */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              {/* 재생 비율만큼 가로폭이 동적으로 채워짐 */}
              <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{positionStr}</Text>
              <Text style={styles.timeText}>{durationStr}</Text>
            </View>
          </View>

          {/* 미디어 제어 버튼 그룹 */}
          <View style={styles.controlsRow}>
            {/* 뒤로 감기 버튼 (임시 처리) */}
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={{ color: '#8A8A8A', fontSize: 16 }}>⏪</Text>
            </TouchableOpacity>
            
            {/* 중앙 메인 재생 / 일시정지 토글 버튼 */}
            <TouchableOpacity style={styles.playButtonCircle} onPress={onTogglePlay} activeOpacity={0.8}>
              {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </TouchableOpacity>

            {/* 앞으로 감기 버튼 (임시 처리) */}
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={{ color: '#8A8A8A', fontSize: 16 }}>⏩</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}