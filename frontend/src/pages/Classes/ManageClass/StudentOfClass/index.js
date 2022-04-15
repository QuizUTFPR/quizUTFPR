import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '@api';

// Components
import Tooltip from '@components/ToolTip';
import { Send, Email, Delete } from '@mui/icons-material';

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
      const { data } = await api.get(`/class/getAllClassStudents/${idClass}`);
      console.log('data', data);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveStudent = () => {
    try {
      console.log('teste');
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
            <StyledAvatar src={item?.imageProfile?.url} />
            <WrapperText>
              <TextBold>{item.name}</TextBold>
              <Text>{item.email}</Text>
            </WrapperText>
            <ActionsWrapper>
              <Tooltip
                arrow
                ariaLabel="notification"
                title="Enviar Notificação"
              >
                <StyledIconButton>
                  <Send />
                </StyledIconButton>
              </Tooltip>

              <Tooltip arrow ariaLabel="email" title="Enviar Email">
                <StyledIconButton>
                  <Email />
                </StyledIconButton>
              </Tooltip>

              <Tooltip arrow ariaLabel="deletar" title="Remover Aluno">
                <StyledIconButton onClick={() => handleRemoveStudent(item.id)}>
                  <Delete />
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
