import * as React from 'react';
import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import Button from '@components/Button';

const ConfirmExitDialog = ({
  title,
  visible,
  hideDialog,
  secondButtonOnPress,
  firstButtonLabel,
  secondButtonLabel,
  children,
}) => (
  <View>
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content style={{ alignItems: 'center' }}>
          {children}
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-between' }}>
          {firstButtonLabel && (
            <Button style={{ flex: 1 }} onPress={hideDialog}>
              {firstButtonLabel}
            </Button>
          )}
          {secondButtonLabel && (
            <Button style={{ flex: 1 }} onPress={secondButtonOnPress}>
              {secondButtonLabel}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
);

export default ConfirmExitDialog;
