import React from 'react';

// Style
import { Feather } from '@expo/vector-icons';
import { StyledButton } from './style';

// Assets

const FabButton = ({ onPress, variant }) => (
  <StyledButton variant={variant} onPress={onPress}>
    <Feather name="plus" size={32} color="white" />
  </StyledButton>
);

FabButton.defaultProps = {
  onClick: () => {},
  variant: 'primary',
};

export default FabButton;
