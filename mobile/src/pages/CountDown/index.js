import React from 'react';
import LottieView from 'lottie-react-native';

const Question = ({ navigation }) => (
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
);

export default Question;
