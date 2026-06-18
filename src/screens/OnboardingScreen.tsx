
import React, { useEffect, useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Step = 'splash' | 'nickname' | 'terms' | 'character';

interface OnboardingScreenProps {
  onComplete: (nickname: string) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState<Step>('splash');
  const [nickname, setNickname] = useState('');
  const [terms, setTerms] = useState([false, false, false, false]);

  useEffect(() => {
    if (step !== 'splash') return undefined;
    const timer = setTimeout(() => setStep('nickname'), 1300);
    return () => clearTimeout(timer);
  }, [step]);

  const allTermsChecked = useMemo(() => terms.every(Boolean), [terms]);
  const canSubmitNickname = nickname.trim().length > 0;

  if (step === 'splash') {
    return (
      <SafeAreaView style={onboardingStyles.splash}>
        <View style={onboardingStyles.logoGroup}>
          <Text style={onboardingStyles.logo}>PLAYCE</Text>
          <Text style={onboardingStyles.splashSubtitle}>내가 만든 키링이 나만의 관광가이드로,</Text>
        </View>
        <Image
          source={require('../../assets/images/course_history/bg_illust_haenggung.png')}
          style={onboardingStyles.mountain}
          resizeMode="cover"
        />
        <Image source={require('../../assets/images/course_history/popup_illust_rfid_haenggung.png')} style={onboardingStyles.palace} resizeMode="contain" />
      </SafeAreaView>
    );
  }

  if (step === 'nickname') {
    return (
      <SafeAreaView style={onboardingStyles.screen}>
        <Text style={onboardingStyles.stepMark}>1</Text>
        <Text style={onboardingStyles.title}>사용하실 닉네임을{'\n'}설정해주세요!</Text>
        <Text style={onboardingStyles.label}>닉네임</Text>
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="행궁체험사랑"
          style={onboardingStyles.input}
          maxLength={12}
        />
        <TouchableOpacity
          style={[onboardingStyles.bottomButton, !canSubmitNickname && onboardingStyles.bottomButtonDisabled]}
          disabled={!canSubmitNickname}
          onPress={() => setStep('terms')}
          activeOpacity={0.85}
        >
          <Text style={onboardingStyles.bottomButtonText}>다음</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (step === 'terms') {
    return (
      <SafeAreaView style={onboardingStyles.screen}>
        <Text style={onboardingStyles.stepMark}>2</Text>
        <Text style={onboardingStyles.title}>서비스 이용을 위한{'\n'}약관에 동의해주세요!</Text>
        <View style={onboardingStyles.termsList}>
          {['전체 동의', '서비스 이용약관 동의', '개인정보 수집 및 이용 동의', '위치기반 서비스 이용 동의'].map((label, index) => (
            <TouchableOpacity
              key={label}
              style={onboardingStyles.termRow}
              onPress={() => {
                if (index === 0) {
                  const next = !allTermsChecked;
                  setTerms([next, next, next, next]);
                } else {
                  setTerms((current) => current.map((checked, termIndex) => (termIndex === index ? !checked : checked)));
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={onboardingStyles.termText}>{label}</Text>
              <View style={[onboardingStyles.checkbox, terms[index] && onboardingStyles.checkboxActive]}>
                {terms[index] && <Text style={onboardingStyles.checkText}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[onboardingStyles.bottomButton, !allTermsChecked && onboardingStyles.bottomButtonDisabled]}
          disabled={!allTermsChecked}
          onPress={() => setStep('character')}
          activeOpacity={0.85}
        >
          <Text style={onboardingStyles.bottomButtonText}>다음</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={onboardingStyles.screen}>
      <Text style={onboardingStyles.stepMark}>3</Text>
      <Text style={onboardingStyles.characterTitle}>
        관광 메이트 '해온'와{'\n'}함께 행궁동을 구경하세요!
      </Text>
      <View style={onboardingStyles.characterCard}>
        <Text style={onboardingStyles.characterBubble}>제가 장소에 도착하면 이야기를 들려드릴게요.</Text>
        <Image source={require('../../assets/images/onboarding/mascot.png')} style={onboardingStyles.mascot} resizeMode="contain" />
      </View>
      <TouchableOpacity style={onboardingStyles.bottomButton} onPress={() => onComplete(nickname.trim() || '행궁체험사랑')} activeOpacity={0.85}>
        <Text style={onboardingStyles.bottomButtonText}>시작하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const onboardingStyles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoGroup: {
    alignItems: 'center',
    marginTop: 352,
  },
  logo: {
    color: '#FFB826',
    fontSize: 43,
    fontWeight: '900',
  },
  splashSubtitle: {
    color: '#FFB826',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  mountain: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    height: 306,
  },
  palace: {
    position: 'absolute',
    bottom: 54,
    width: 100,
    height: 80,
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 32,
  },
  stepMark: {
    color: '#1BC5CC',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 70,
  },
  title: {
    color: '#1BC5CC',
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '900',
    marginTop: 28,
  },
  label: {
    color: '#8A8A8A',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 78,
    marginBottom: 8,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 3,
    paddingHorizontal: 12,
    color: '#000000',
    fontSize: 14,
    backgroundColor: '#FFFDF2',
  },
  bottomButton: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 58,
    height: 52,
    borderRadius: 3,
    backgroundColor: '#FFB826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonDisabled: {
    backgroundColor: '#D8D8D8',
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  termsList: {
    marginTop: 58,
    gap: 18,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  termText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#8A8A8A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  characterTitle: {
    color: '#1BC5CC',
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 190,
  },
  characterCard: {
    alignItems: 'center',
    marginTop: 42,
  },
  characterBubble: {
    width: 214,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#8A8A8A',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  mascot: {
    width: 142,
    height: 142,
    marginTop: 20,
  },
});
