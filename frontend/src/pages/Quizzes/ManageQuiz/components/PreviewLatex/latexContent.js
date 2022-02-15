import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

// STYLE
import { PlaceHolder } from './style';

const LatexContent = (props) => {
  const myInput = useMemo(() => <MemoizedLatexContent {...props} />, [props]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{myInput}</>;
};

const MemoizedLatexContent = ({
  component: Component,
  value,
  propsLatex,
  ...props
}) => {
  return (
    <Component {...props}>
      {!value ? <PlaceHolder>{propsLatex.placeholder}</PlaceHolder> : value}
    </Component>
  );
};

LatexContent.defaultProps = {};

LatexContent.propTypes = {};

export default LatexContent;
