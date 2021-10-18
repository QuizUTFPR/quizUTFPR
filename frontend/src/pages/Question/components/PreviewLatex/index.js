import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LatexContent from './latexContent';

const InputOrLatexContent = ({ inputComponent, latexComponent, disabled }) => {
  const [seeInput, setInput] = useState(false);
  const { component: InputComponent, propsInput } = inputComponent;
  const { value } = propsInput;
  const { component: LatexComponent, propsLatex } = latexComponent;

  const changeComponent = (newValue) => {
    if (!disabled) {
      setInput(newValue);
    }
  };

  return (
    <>
      {seeInput ? (
        <InputComponent
          {...propsInput}
          autoFocus
          onBlur={() => changeComponent(false)}
        />
      ) : (
        <LatexContent
          // onTypeset={(e) => console.log(e)}
          component={LatexComponent}
          propsLatex={propsLatex}
          onClick={() => changeComponent(true)}
          value={value}
        />
      )}
    </>
  );
};

InputOrLatexContent.defaultProps = {
  disabled: false,
};

InputOrLatexContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  inputComponent: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  latexComponent: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default InputOrLatexContent;
