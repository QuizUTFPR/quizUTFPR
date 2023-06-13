import React, { useRef, useEffect } from 'react';
import renderMathInElement from 'katex/dist/contrib/auto-render';
// import 'katex/dist/katex.css';

const Katex = ({ children, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      renderMathInElement(ref.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          {
            left: '\\begin{equation}',
            right: '\\end{equation}',
            display: true,
          },
          { left: '\\begin{align}', right: '\\end{align}', display: true },
          { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
          { left: '\\begin{gather}', right: '\\end{gather}', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\{', right: '\\}', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
      });
    }
  }, [ref.current, children]);

  return (
    <div ref={ref} {...props}>
      <p
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default Katex;
