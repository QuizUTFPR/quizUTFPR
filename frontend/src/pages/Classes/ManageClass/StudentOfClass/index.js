import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '@api';

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
  const [students, setStudents] = useState([]);
  const { idClass } = useParams();

  const getAllStudents = async () => {
    try {
      const { data } = await api.get(
        `/class/getAllClassStudents?idClass=${idClass}`
      );

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <Wrapper
      key="students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StudentsWrapper>
        {students.map((item) => (
          <Student key={item.id}>
            <StyledAvatar />
            <WrapperText>
              <TextBold>{item.name}</TextBold>
              <Text>{item.email}</Text>
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
        ))}
      </StudentsWrapper>
    </Wrapper>
  );
};

export default StudentOfClass;
