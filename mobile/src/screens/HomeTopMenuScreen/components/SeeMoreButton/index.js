import React from 'react';
import { SeeMore, SeeMoreText } from './style';

const SeeMoreButton = ({ onPress }) => (
  <SeeMore onPress={onPress}>
    <SeeMoreText fill="white">Ver tudo</SeeMoreText>
  </SeeMore>
);

export default SeeMoreButton;
