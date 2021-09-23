import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import { MathJaxContext } from 'better-react-mathjax';

// STYLE
import { PlaceHolder } from './style';

import configMathJax from '../../../../config/mathJax';

export default function LatexContent(props) {
  const myInput = useMemo(() => <MemoizedLatexContent {...props} />, [props]);

  return <>{myInput}</>;
}

function MemoizedLatexContent({
  component: Component,
  value,
  propsLatex,
  ...props
}) {
  return (
    <MathJaxContext version={3} config={configMathJax}>
      <Component {...props}>
        {!value ? <PlaceHolder>{propsLatex.placeholder}</PlaceHolder> : value}
      </Component>
    </MathJaxContext>
  );
}

LatexContent.defaultProps = {};

LatexContent.propTypes = {};
