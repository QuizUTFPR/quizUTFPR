import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

import {
  Wrapper,
  StyledWrapperButtons,
  StyledModal,
  StyledTitle,
  StyledWrapperChildren,
  StyledText,
  FirstButton,
  SecondButton,
  SecondButtonText,
} from './style';

const Dialog = ({
  title,
  visible,
  firstButtonOnPress,
  secondButtonOnPress,
  firstButtonLabel,
  secondButtonLabel,
  lottieAnimation,
  hideDialog,
  childrenNode,
  childrenText,
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getSize = (event) => {
    const { nativeEvent } = event;
    const { layout } = nativeEvent;
    console.log('nativeEvent', layout);
    setWidth(layout.width);
    setHeight(layout.height);
  };

  return (
    <StyledModal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={hideDialog}
    >
      <BlurView intensity={100} tint="dark" style={[StyleSheet.absoluteFill]}>
        <Wrapper
          fill="white"
          onLayout={getSize}
          propWidth={width}
          propHeight={height}
        >
          <StyledTitle fill="purple">{title}</StyledTitle>
          <StyledWrapperChildren>
            {lottieAnimation}
            {!!childrenNode && childrenNode}
            {!!childrenText && <StyledText>{childrenText}</StyledText>}
          </StyledWrapperChildren>
          <StyledWrapperButtons>
            {firstButtonLabel && (
              <FirstButton onPress={firstButtonOnPress}>
                {firstButtonLabel}
              </FirstButton>
            )}
            {secondButtonLabel && (
              <SecondButton>
                <SecondButtonText onPress={secondButtonOnPress} fill="purple">
                  {secondButtonLabel}
                </SecondButtonText>
              </SecondButton>
            )}
          </StyledWrapperButtons>
        </Wrapper>
      </BlurView>
    </StyledModal>
  );
};

Dialog.defaultProps = {
  childrenNode: false,
  childrenText: false,
};

export default Dialog;
