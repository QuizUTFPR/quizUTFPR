import React from 'react';
import PropTypes from 'prop-types';

// Components
import AnimatedContainer from '@components/WrapperAnimatedPage';

// Styles
import { GridContainer } from './style';

const Container = ({ width, slide, slideUp, children, ...props }) => {
  return (
    <AnimatedContainer>
      <GridContainer width={width} {...props}>
        {children}
      </GridContainer>
    </AnimatedContainer>
  );
};

Container.defaultProps = {
  children: 'Conteúdo aqui',
  slide: true,
  slideUp: false,
};

Container.propTypes = {
  children: PropTypes.node,
  slide: PropTypes.bool,
  slideUp: PropTypes.bool,
};

export default Container;
