import React from 'react';

// Components
import Tooltip from '@components/ToolTip';
import { Send, Email } from '@mui/icons-material';

// Style
import {
  Wrapper,
  StudentsWrapper,
  Student,
  StyledAvatar,
  WrapperText,
  Text,
  TextBold,
  ActionsWrapper,
  StyledIconButton,
} from './style';

const StudentOfClass = () => {
  return (
    <Wrapper
      key="students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StudentsWrapper>
        <Student>
          <StyledAvatar />
          <WrapperText>
            <TextBold>Jhonatan Guilherme de Oliveira Cunha</TextBold>
            <Text>jhonatancunha@alunos.utfpr.edu.br</Text>
          </WrapperText>
          <ActionsWrapper>
            <Tooltip arrow ariaLabel="deletar" title="Enviar Notificação">
              <StyledIconButton>
                <Send />
              </StyledIconButton>
            </Tooltip>

            <Tooltip arrow ariaLabel="deletar" title="Enviar Email">
              <StyledIconButton>
                <Email />
              </StyledIconButton>
            </Tooltip>
          </ActionsWrapper>
        </Student>
      </StudentsWrapper>
    </Wrapper>
  );
};

export default StudentOfClass;
