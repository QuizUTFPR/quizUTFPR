import React from 'react';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import LinearContainer from '@components/LinearContainer';
import image from '@assets/FUNDO.png';

const Question = ({ navigation }) => (
  <LinearContainer>
    <ImageBackground
      style={{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      source={image}
    >
      <LottieView
        autoPlay
        loop={false}
        style={{ zIndex: 9999 }}
        resizeMode="cover"
        speed={1}
        // eslint-disable-next-line global-require
        source={require('@assets/countdown.json')}
        onAnimationFinish={() => navigation.navigate('Question')}
      />
    </ImageBackground>
  </LinearContainer>
);

export default Question;
