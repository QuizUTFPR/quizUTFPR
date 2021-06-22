import * as React from 'react';
import Button from '@components/Button';
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

const ConfirmExitDialog = ({
  title,
  visible,
  firstButtonOnPress,
  secondButtonOnPress,
  firstButtonLabel,
  secondButtonLabel,
  lottieAnimation,
  hideDialog,
  children,
}) => (
  <StyledModal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={hideDialog}
  >
    <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill}>
      <Wrapper fill="white">
        <StyledTitle fill="purple">{title}</StyledTitle>
        <StyledWrapperChildren>
          {lottieAnimation}
          <StyledText>{children}</StyledText>
        </StyledWrapperChildren>
        <StyledWrapperButtons>
          {firstButtonLabel && (
            <FirstButton onPress={firstButtonOnPress}>
              {firstButtonLabel}
            </FirstButton>
          )}
          {secondButtonLabel && (
            <SecondButton>
              <SecondButtonText onPress={secondButtonOnPress} fill="black">
                {secondButtonLabel}
              </SecondButtonText>
            </SecondButton>
          )}
        </StyledWrapperButtons>
      </Wrapper>
    </BlurView>
  </StyledModal>
);

export default ConfirmExitDialog;
