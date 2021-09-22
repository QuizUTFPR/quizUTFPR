import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import LinearContainer from '@components/LinearContainer';

import PatternBackground from '@assets/patterns/halftone.png';

// LOTTIE
import CountDownLottie from '@assets/lottie/countdown.json';

const Question = ({ navigation }) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      }),
    [navigation]
  );
  return (
    <LinearContainer>
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
        source={PatternBackground}
      >
        <LottieView
          autoPlay
          loop={false}
          style={{ zIndex: 9999 }}
          resizeMode="cover"
          speed={1}
          // eslint-disable-next-line global-require
          source={CountDownLottie}
          onAnimationFinish={() => navigation.navigate('Question')}
        />
      </ImageBackground>
    </LinearContainer>
  );
};

export default Question;
