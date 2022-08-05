import React from 'react';

// Motion
import { motion } from 'framer-motion';

const AnimatedContainer = ({ children, slide, slideUp }) => {
  return (
    <motion.div
      exit={{ opacity: 0, x: slide, y: slideUp }}
      initial={{ opacity: 0, x: slide, y: slideUp }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delayChildren: 1,
        opacity: { ease: 'linear' },
        layout: { duration: 0.1 },
      }}
    >
      {children}
    </motion.div>
  );
};

AnimatedContainer.defaultProps = {
  slide: true,
  slideUp: false,
};

export default AnimatedContainer;
