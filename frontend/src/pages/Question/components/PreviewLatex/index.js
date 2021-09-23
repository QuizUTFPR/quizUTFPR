import React, { useState } from 'react';
import MathJaxLatex from './latexContent';

const InputOrLatexContent = ({ inputComponent, latexComponent }) => {
  const [seeInput, setInput] = useState(true);
  const { component: InputComponent, propsInput } = inputComponent;
  const { value } = propsInput;
  const { component: LatexComponent, propsLatex } = latexComponent;

  return (
    <>
      {seeInput ? (
        <InputComponent
          {...propsInput}
          autoFocus
          onBlur={() => setInput(false)}
        />
      ) : (
        <MathJaxLatex
          component={LatexComponent}
          propsLatex={propsLatex}
          onClick={() => setInput(true)}
          value={value}
        />
      )}
    </>
  );
};

export default InputOrLatexContent;
