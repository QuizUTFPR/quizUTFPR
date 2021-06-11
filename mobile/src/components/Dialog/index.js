import * as React from 'react';
import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import Button from '@components/Button';

const MyComponent = ({ title, visible, hideDialog, buttonLabel, children }) => (
  <View>
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content style={{ alignItems: 'center' }}>
          {children}
        </Dialog.Content>
        <Dialog.Actions>
          <Button style={{ flex: 1 }} onPress={hideDialog}>
            {buttonLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
);

export default MyComponent;
