import React, { useState } from 'react';
import LatexContent from './latexContent';

const InputOrLatexContent = ({ inputComponent, latexComponent }) => {
  const [seeInput, setInput] = useState(false);
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
        <LatexContent
          onTypeset={(e) => console.log(e)}
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
