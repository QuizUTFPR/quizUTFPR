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
} from './style';

const ConfirmExitDialog = ({
  title,
  visible,
  hideDialog,
  secondButtonOnPress,
  firstButtonLabel,
  secondButtonLabel,
  lottieAnimation,
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
        <StyledTitle color="purple">{title}</StyledTitle>
        <StyledWrapperChildren>
          {lottieAnimation}
          <StyledText>{children}</StyledText>
        </StyledWrapperChildren>
        <StyledWrapperButtons>
          {firstButtonLabel && (
            <Button variant="primary" onPress={hideDialog}>
              {firstButtonLabel}
            </Button>
          )}
          {secondButtonLabel && (
            <Button variant="primary" onPress={secondButtonOnPress}>
              {secondButtonLabel}
            </Button>
          )}
        </StyledWrapperButtons>
      </Wrapper>
    </BlurView>
  </StyledModal>
);

export default ConfirmExitDialog;
