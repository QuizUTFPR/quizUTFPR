import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';

// Components
import Input from '@components/Input';
import ButtonGradient from '@components/ButtonGradient';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// Styles
import {
  InputWrapper,
  StyledContainer,
  Title,
  Description,
  BottomWrapper,
  TopWrapper,
  MiddleWrapper,
  AvatarWrapper,
  AvatarImage,
} from './style';

const ChooseNicknameAndAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState('');
  const teste = [1, 2, 3, 4];

  const { update } = useStudentAuth();

  const handleSetName = (values) => {
    setName(values);
  };

  const handleNext = async () => {
    try {
      await update({ name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // const navigation = useNavigation();

    <StyledContainer>
      <TopWrapper>
        <Title>Informações</Title>
        <Description>
          Escolha um nickname e um avatar para sua conta.
        </Description>
        <InputWrapper>
          <Input
            fill="black"
            label="Nickname"
            placeholder="Digite seu nickname..."
            textAlignVertical="center"
            paddingWrapper="10px 0"
            value={name}
            onChangeText={handleSetName}
          />
        </InputWrapper>
      </TopWrapper>
      <MiddleWrapper>
        {teste.map((item, idx) => (
          <AvatarWrapper
            key={item}
            isActive={idx === selectedAvatar}
            onPress={() => setSelectedAvatar(idx)}
          >
            <AvatarImage
              source={{
                uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
              }}
            />
          </AvatarWrapper>
        ))}
      </MiddleWrapper>

      <BottomWrapper>
        <InputWrapper>
          <ButtonGradient onPress={handleNext} variant="primary">
            AVANÇAR
          </ButtonGradient>
        </InputWrapper>
      </BottomWrapper>
    </StyledContainer>
  );
};
export default ChooseNicknameAndAvatar;
