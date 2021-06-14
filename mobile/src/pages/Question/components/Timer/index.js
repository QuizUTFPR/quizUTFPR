import React from 'react';
import { Animated } from 'react-native';

import { WrapperProgress, TextTimer, ProgressBG, Progress } from './style';

const Timer = ({ widthAnimation, timerState }) => (
  <WrapperProgress>
    <TextTimer>{timerState.seconds}</TextTimer>
    <ProgressBG progress={1} color="red" />
    <Progress
      style={{
        width: widthAnimation,
      }}
      as={Animated.View}
      widthTimer={timerState.widthTimer}
      progress={1}
      color="red"
    />
  </WrapperProgress>
);

export default Timer;
