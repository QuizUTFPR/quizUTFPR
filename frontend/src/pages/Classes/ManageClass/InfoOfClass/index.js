import React, { useState, useEffect } from 'react';
import api from '@api';
import { useParams } from 'react-router-dom';

// Style
import {
  Wrapper,
  InfoClassWrapper,
  ImageClass,
  Bold,
  ValueText,
  WrapperText,
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

  useEffect(() => {
    getClass();
  }, []);

  console.log(classInstance);

  return (
    <Wrapper
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InfoClassWrapper>
        <ImageClass src={classInstance?.imageClass?.url} />
        <WrapperText>
          <Bold>Título:</Bold>
          <ValueText>{classInstance?.title}</ValueText>
        </WrapperText>

        <WrapperText>
          <Bold>Descrição:</Bold>
          <ValueText>{classInstance?.description}</ValueText>
        </WrapperText>

        <WrapperText>
          <Bold>PIN:</Bold>
          <ValueText>{classInstance?.pin}</ValueText>
        </WrapperText>
      </InfoClassWrapper>
    </Wrapper>
  );
};

export default InfoOfClass;
