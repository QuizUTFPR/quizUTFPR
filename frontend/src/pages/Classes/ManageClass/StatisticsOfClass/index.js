import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '@api';

// Components
import Tooltip from '@components/ToolTip';
import { Send, Email } from '@mui/icons-material';
import { MenuItem } from '@mui/material';

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
  StyledTextField,
} from './style';

const selectOptions = {
  1: 'Quizzes respondidos.',
  2: 'Questões acertadas.',
  3: 'Quem não respondeu nenhum quiz.',
};

const selectOptionsRoutes = {
  1: (idClass) =>
    `/class/getStatistics/${idClass}/StudentThatFinishedMoreQuizzes`,
  2: (idClass) => `/class/getStatistics/${idClass}/StudentWhoHitMostQuestions`,
  3: (idClass) =>
    `/class/getStatistics/${idClass}/StudentThatDidntAnsweredQuizzes`,
};

const StudentOfClass = () => {
  const [students, setStudents] = useState([{}]);
  const [type, setType] = useState('');
  const [filterOption, setFilterOption] = useState(1);
  const { idClass } = useParams();

  const handleGetStatisticsOfClass = async (e) => {
    try {
      const url = selectOptionsRoutes[filterOption](idClass);

      const { data } = await api.get(url);
      setStudents(data.students);
      setType(data.type);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStatisticsOfClass();
  }, [filterOption]);

  return (
    <Wrapper
      key="students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StudentsWrapper>
        <StyledTextField
          style={{ width: '100%' }}
          label="Ordenar por"
          id="filterOption"
          name="filterOption"
          variant="outlined"
          onChange={(e) => setFilterOption(e.target.value)}
          value={filterOption}
          required
          select
        >
          {Object.entries(selectOptions).map((item) => (
            <MenuItem key={item[0]} value={item[0]}>
              {item[1]}
            </MenuItem>
          ))}
        </StyledTextField>
        {students.map((item) => (
          <Student key={item.id}>
            <StyledAvatar src={item?.imageProfile?.url} />
            <WrapperText>
              <TextBold>{item.name}</TextBold>
              <Text>{item.email}</Text>
            </WrapperText>

            {type !== 'GetStudentThatDidntAnsweredQuizzes' && (
              <Text>
                {item.totalHit}/{item.total}{' '}
                {type === 'GetStudentThatFinishedMoreQuizzes'
                  ? 'quizzes respondidos'
                  : 'questões acertadas'}
              </Text>
            )}
          </Student>
        ))}
      </StudentsWrapper>
    </Wrapper>
  );
};

export default StudentOfClass;
