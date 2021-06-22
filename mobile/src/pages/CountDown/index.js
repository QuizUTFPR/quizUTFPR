import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import LinearContainer from '@components/LinearContainer';
// import image from '@assets/FUNDO.png';
import image2 from '@assets/patterns/halftone.png';

const Question = ({ navigation }) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
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
        source={image2}
      >
        <LottieView
          autoPlay
          loop={false}
          style={{ zIndex: 9999 }}
          resizeMode="cover"
          speed={1}
          // eslint-disable-next-line global-require
          source={require('@assets/lottie/countdown.json')}
          onAnimationFinish={() => navigation.navigate('Question')}
        />
      </ImageBackground>
    </LinearContainer>
  );
};

export default Question;
