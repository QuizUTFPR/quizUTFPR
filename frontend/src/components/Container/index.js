import React from 'react';
import PropTypes from 'prop-types';

// Components
import AnimatedContainer from '@components/WrapperAnimatedPage';

// Styles
import { GridContainer } from './style';

const Container = ({ slide, slideUp, children, ...props }) => (
  <AnimatedContainer>
    <GridContainer {...props}>{children}</GridContainer>
  </AnimatedContainer>
);

Container.defaultProps = {
  children: 'Conteudo aqui',
  slide: true,
  slideUp: false,
};

Container.propTypes = {
  children: PropTypes.node,
  slide: PropTypes.bool,
  slideUp: PropTypes.bool,
};

export default Container;
