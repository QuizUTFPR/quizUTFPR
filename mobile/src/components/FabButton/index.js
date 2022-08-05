import React from 'react';

// Style
import { Feather } from '@expo/vector-icons';
import { StyledButton } from './style';

// Assets

const FabButton = ({ onPress, variant, icon }) => (
  <StyledButton variant={variant} onPress={onPress}>
    {icon}
  </StyledButton>
);

FabButton.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  icon: <Feather name="plus" size={32} color="white" />,
};

export default FabButton;
