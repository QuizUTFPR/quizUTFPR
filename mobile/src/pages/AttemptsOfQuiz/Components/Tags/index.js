import React from 'react';
import { AntDesign } from '@expo/vector-icons';

// THEME
import theme from '../../../../styles/theme';

// STYLES
import {
  StyledScrollView,
  TagsWrapper,
  TagContainer,
  TagText,
  IconButtonWrapper,
} from './styles';

const Tags = ({ tags }) => (
  <StyledScrollView>
    <TagsWrapper>
      {tags.map((tag) => (
        <TagContainer key={tag}>
          <TagText>{tag}</TagText>
          <IconButtonWrapper onPress={() => console.log('clicou na tag')}>
            <AntDesign name="arrowright" size={24} color={theme.color.purple} />
          </IconButtonWrapper>
        </TagContainer>
      ))}
    </TagsWrapper>
  </StyledScrollView>
);

export default Tags;
