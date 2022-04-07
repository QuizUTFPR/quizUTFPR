import React, { useState, useEffect } from 'react';
import api from '@api';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';

// Style
import { LibraryBooks, Person, LocationSearching } from '@mui/icons-material';
import {
  Wrapper,
  InfoClassWrapper,
  ImageClass,
  Bold,
  ValueText,
  WrapperText,
  WrapperInformation,
  RightWrapper,
  LeftWrapper,
  CircleIconInformation,
  ContentWrapperInformation,
  TitleInformation,
  ValueInformation,
  EmptyImage,
} from './style';

const InfoOfClass = () => {
  const [classInstance, setClassInstance] = useState(null);
  const { idClass } = useParams();

  const getClass = async () => {
    const { data } = await api.post('/class/getClass', {
      id: idClass,
    });

    setClassInstance(data);
  };

  const options = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  useEffect(() => {
    getClass();
  }, []);

  return (
    <Wrapper
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LeftWrapper>
        <InfoClassWrapper>
          {classInstance?.imageClass?.url ? (
            <ImageClass src={classInstance?.imageClass?.url} />
          ) : (
            <EmptyImage />
          )}
          <WrapperText>
            <Bold>PIN:</Bold>
            <ValueText>{classInstance?.pin}</ValueText>
          </WrapperText>
          <WrapperText>
            <Bold>Nome da Turma:</Bold>
            <ValueText>{classInstance?.title}</ValueText>
          </WrapperText>

          <WrapperText>
            <Bold>Descrição:</Bold>
            <ValueText>{classInstance?.description}</ValueText>
          </WrapperText>
        </InfoClassWrapper>
      </LeftWrapper>

      <RightWrapper>
        <WrapperInformation>
          <CircleIconInformation color="purple">
            <LibraryBooks sx={{ color: 'white' }} />
          </CircleIconInformation>
          <ContentWrapperInformation>
            <TitleInformation>Quizzes Anexados</TitleInformation>
            <ValueInformation>
              Existem {classInstance?.attachedQuizzes} quizzes anexados.
            </ValueInformation>
          </ContentWrapperInformation>
        </WrapperInformation>

        <WrapperInformation>
          <CircleIconInformation color="#e52f92">
            <Person sx={{ color: 'white' }} />
          </CircleIconInformation>
          <ContentWrapperInformation>
            <TitleInformation>Alunos Inscritos</TitleInformation>
            <ValueInformation>
              Existem {classInstance?.studentsSubscribed} alunos cadastrados.
            </ValueInformation>
          </ContentWrapperInformation>
        </WrapperInformation>
      </RightWrapper>

      <Chart
        options={options.options}
        series={options.series}
        type="bar"
        width="500"
      />
    </Wrapper>
  );
};

export default InfoOfClass;
