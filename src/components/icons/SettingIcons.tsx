// src/components/icons/SettingIcons.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

// 🌟 행 우측에 들어가는 꺾쇠 화살표 (weui:arrow-outlined 기반)
export const ArrowRightIcon = ({ color = '#000000', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M9 18L15 12L9 6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

// 🌟 상단 뒤로가기 등에 쓰이는 좌측 화살표
export const ArrowLeftIcon = ({ color = '#8A8A8A', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M15 19L8 12L15 5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

export const ProfileCharacterIcon = ({ size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 피그마의 캐릭터 이미지에 해당하는 기본 플레이스홀더 아이콘 */}
    <Path 
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" 
      fill="#8A8A8A" 
    />
  </Svg>
);