// src/hooks/useAudioPlayer.ts
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export function useAudioPlayer(audioSource: any) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // 🌟 오디오 재생 완료 상태
  const [position, setPosition] = useState(0);         // 현재 재생 시간 (밀리초)
  const [duration, setDuration] = useState(0);         // 전체 길이 (밀리초)

  // 1. 컴포넌트가 켜질 때 오디오 파일을 로드합니다.
  useEffect(() => {
    async function loadAudio() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    }

    loadAudio();

    // 컴포넌트가 꺼질 때 메모리 누수 방지를 위해 오디오를 해제합니다.
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioSource]);

  // 2. 오디오 재생 상태가 변할 때마다 실행되는 추적 함수
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      // 🌟 핵심: 오디오가 끝까지 재생되었는지 감지!
      if (status.didJustFinish) {
        setIsFinished(true);
        setIsPlaying(false);
      }
    }
  };

  // 3. 재생 / 일시정지 토글 함수
  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      // 끝까지 다 들은 상태에서 다시 재생을 누르면 처음부터 다시 시작
      if (isFinished) {
        await sound.replayAsync();
        setIsFinished(false); 
      } else {
        await sound.playAsync();
      }
    }
  };

  // 4. 밀리초(ms)를 0:00 (분:초) 형태의 문자열로 예쁘게 바꿔주는 도우미 함수
  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return {
    isPlaying,
    isFinished,
    positionStr: formatTime(position), // 예: "0:34"
    durationStr: formatTime(duration), // 예: "8:34"
    progressRatio: duration > 0 ? position / duration : 0, // 진행률 (0 ~ 1)
    togglePlayPause,
  };
}