// src/hooks/useAudioPlayer.ts
import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { useFocusEffect } from 'expo-router'; // 🌟 라우터 포커스 훅 추가

export function useAudioPlayer(audioSource: any) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const soundRef = useRef<Audio.Sound | null>(null);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsFinished(true);
        setIsPlaying(false);
      }
    }
  };

  // 🌟 핵심: 화면에 들어올 때 실행되고, 나갈 때 클린업(초기화)됩니다.
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function loadAudio() {
        try {
          // 아이폰 무음 모드에서도 소리가 나도록 안전장치 추가
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
          });

          const { sound: newSound } = await Audio.Sound.createAsync(
            audioSource,
            { shouldPlay: false },
            onPlaybackStatusUpdate
          );

          if (isMounted) {
            setSound(newSound);
            soundRef.current = newSound;
          } else {
            // 이미 화면을 나갔다면 로드된 즉시 버림
            newSound.unloadAsync();
          }
        } catch (error) {
          console.log("Audio load error:", error);
        }
      }

      loadAudio();

      // 👇 화면에서 나갈 때(뒤로 가기 등) 자동으로 실행되는 해제 로직
      return () => {
        isMounted = false;
        if (soundRef.current) {
          // 재생 중이던 소리를 멈추고 메모리에서 완전히 날림
          soundRef.current.stopAsync().then(() => {
            soundRef.current?.unloadAsync();
          }).catch(e => console.log(e));
        }
        
        // 모든 상태를 처음으로 되돌림
        setSound(null);
        soundRef.current = null;
        setIsPlaying(false);
        setIsFinished(false);
        setPosition(0);
      };
    }, [audioSource])
  );

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      if (isFinished) {
        await sound.replayAsync();
        setIsFinished(false); 
      } else {
        await sound.playAsync();
      }
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return {
    isPlaying,
    isFinished,
    positionStr: formatTime(position),
    durationStr: formatTime(duration),
    progressRatio: duration > 0 ? position / duration : 0,
    togglePlayPause,
    // 🌟 수동 stopAudio는 화면 나갈 때 자동 처리되므로 더 이상 필요 없습니다.
  };
}