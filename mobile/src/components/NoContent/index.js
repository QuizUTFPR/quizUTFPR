import React from 'react';

// Assets
import NoContentFile from '@assets/lottie/no_content.json';
import DefaultImage from '@assets/adaptive-icon.png';

// Style
import {
  Title,
  Wrapper,
  Subtitle,
  StyledImage,
  StyledLottieView,
} from './style';

const NoContent = ({ fill, title, subtitle, sourceLottie, imageType }) => (
  <Wrapper>
    {imageType && <StyledImage source={DefaultImage} />}
    {!imageType && (
      <StyledLottieView
        autoPlay
        loop
        resizeMode="cover"
        speed={1}
        source={sourceLottie}
      />
    )}
    <Title fill={fill}>{title}</Title>
    <Subtitle fill={fill}>{subtitle}</Subtitle>
  </Wrapper>
);

NoContent.defaultProps = {
  fill: 'black',
  title: 'Opps...',
  subtitle: 'Não encontramos nenhuma turma pública.',
  sourceLottie: NoContentFile,
  imageType: false,
};

export default NoContent;
