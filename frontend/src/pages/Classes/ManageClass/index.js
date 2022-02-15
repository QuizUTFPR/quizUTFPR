import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import AnimatedContainer from '@components/WrapperAnimatedPage';
import Toolbaar from './components/Toolbar';

// Style
import {
  Container,
  Content,
  Wrapper,
  WrapperMenuContent,
  ItemMenuContent,
} from './style';

const menu = [
  {
    label: 'Informações',
    key: 0,
  },
  {
    label: 'Quizzes',
    key: 1,
  },
  {
    label: 'Alunos',
    key: 2,
  },
];

const ManageClass = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <AnimatedContainer>
      <Container>
        <Toolbaar />
        <Wrapper>
          <WrapperMenuContent>
            {menu.map((item) => (
              <ItemMenuContent
                key={item.key}
                onClick={() => setActiveScreen(item.key)}
                isActive={activeScreen === item.key}
              >
                {item.label}
              </ItemMenuContent>
            ))}
          </WrapperMenuContent>

          <Content>
            <AnimatePresence>
              {activeScreen === 0 && (
                <motion.p
                  key="info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  informações
                </motion.p>
              )}
              {activeScreen === 1 && (
                <motion.p
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  quizzes
                </motion.p>
              )}
              {activeScreen === 2 && (
                <motion.p
                  key="alunos"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  alunos
                </motion.p>
              )}
            </AnimatePresence>
          </Content>
        </Wrapper>
      </Container>
    </AnimatedContainer>
  );
};

export default ManageClass;
