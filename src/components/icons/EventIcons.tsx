// src/components/icons/EventIcons.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

// 🌟 전체 (햄버거 메뉴) 아이콘
export const HamburgerIcon = ({ color = '#FFFFFF', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M4 6H20M4 12H20M4 18H20" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

// 🌟 전시 (팔레트) 아이콘
export const PaletteIcon = ({ color = '#1BC5CC', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C12.55 22 13 21.55 13 21C13 20.74 12.9 20.49 12.73 20.31C12.55 20.12 12.44 19.86 12.44 19.56C12.44 18.99 12.91 18.53 13.48 18.53H15.82C19.23 18.53 22 15.76 22 12.35C22 6.63 17.5 2 12 2ZM6.5 12C5.67 12 5 11.33 5 10.5C5 9.67 5.67 9 6.5 9C7.33 9 8 9.67 8 10.5C8 11.33 7.33 12 6.5 12ZM9.5 8C8.67 8 8 7.33 8 6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5C11 7.33 10.33 8 9.5 8ZM14.5 8C13.67 8 13 7.33 13 6.5C13 5.67 13.67 5 14.5 5C15.33 5 16 5.67 16 6.5C16 7.33 15.33 8 14.5 8ZM17.5 12C16.67 12 16 11.33 16 10.5C16 9.67 16.67 9 17.5 9C18.33 9 19 9.67 19 10.5C19 11.33 18.33 12 17.5 12Z" />
  </Svg>
);

// 🌟 공연 (티켓) 아이콘
export const TicketIcon = ({ color = '#1BC5CC', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2.01 4.9 2.01 6V10C3.11 10 4 10.9 4 12C4 13.1 3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.9 14 20 13.1 20 12C20 10.9 22 10 22 10ZM11 15H9V13H11V15ZM11 11H9V9H11V11ZM15 15H13V13H15V15ZM15 11H13V9H15V11Z" />
  </Svg>
);

// 🌟 팝업/플리마켓 (스토어) 아이콘
export const StoreIcon = ({ color = '#1BC5CC', size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" />
  </Svg>
);

// 🌟 내 업적 (왕관) 아이콘
export const CrownIcon = ({ color = '#FFFFFF', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V18H19V19Z" />
  </Svg>
);