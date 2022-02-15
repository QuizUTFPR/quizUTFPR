import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import AnimatedContainer from '@components/WrapperAnimatedPage';
import Toolbaar from './components/Toolbar';

// Pages
import InfoOfClass from './InfoOfClass';
import QuizzesOfClass from './QuizzesOfClass';
import StudentOfClass from './StudentOfClass';

// Style
import { Container, Wrapper, WrapperMenu, ItemMenuContent } from './style';

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

        <WrapperMenu>
          {menu.map((item) => (
            <ItemMenuContent
              key={item.key}
              onClick={() => setActiveScreen(item.key)}
              isActive={activeScreen === item.key}
            >
              {item.label}
            </ItemMenuContent>
          ))}
        </WrapperMenu>

        <Wrapper>
          <AnimatePresence>
            {activeScreen === 0 && <InfoOfClass />}
            {activeScreen === 1 && <QuizzesOfClass />}
            {activeScreen === 2 && <StudentOfClass />}
          </AnimatePresence>
        </Wrapper>
      </Container>
    </AnimatedContainer>
  );
};

export default ManageClass;
