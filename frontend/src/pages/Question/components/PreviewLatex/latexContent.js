import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

// STYLE
import { PlaceHolder } from './style';

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
    <Component {...props}>
      {!value ? <PlaceHolder>{propsLatex.placeholder}</PlaceHolder> : value}
    </Component>
  );
}

LatexContent.defaultProps = {};

LatexContent.propTypes = {};
