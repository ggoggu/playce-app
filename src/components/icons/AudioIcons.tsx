// src/components/icons/AudioIcons.tsx
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

// 🌟 1. 오디오 재생 버튼 아이콘
export const PlayIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 5V19L19 12L8 5Z" fill={color} />
  </Svg>
);

// 🌟 2. 오디오 일시정지 버튼 아이콘 (피그마엔 없지만 기능상 반드시 필요합니다!)
export const PauseIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="5" width="4" height="14" fill={color} />
    <Rect x="14" y="5" width="4" height="14" fill={color} />
  </Svg>
);