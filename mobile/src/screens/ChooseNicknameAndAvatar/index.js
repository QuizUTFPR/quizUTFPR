import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import api from '@api';
import { API_URL } from '@env';

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
  const [images, setImages] = useState([]);

  const { update } = useStudentAuth();

  const handleSetName = (values) => {
    setName(values);
  };

  const handleNext = async () => {
    try {
      await update({
        name,
        avatar: images[selectedAvatar],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAvailablesAvatars = async () => {
    try {
      const { data } = await api.get('/getAvatars');
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAvailablesAvatars();
  }, []);

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
            // paddingWrapper="10px 0"
            value={name}
            onChangeText={handleSetName}
          />
        </InputWrapper>
      </TopWrapper>
      <MiddleWrapper>
        {images.map((item, idx) => (
          <AvatarWrapper
            key={item}
            isActive={idx === selectedAvatar}
            onPress={() => setSelectedAvatar(idx)}
          >
            <AvatarImage source={{ uri: `${API_URL}/avatars/${item}` }} />
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
