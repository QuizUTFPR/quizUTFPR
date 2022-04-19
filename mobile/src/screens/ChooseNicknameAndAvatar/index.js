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
  StyledFlatList,
} from './style';

const ChooseNicknameAndAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [errorRequest, setErrorRequest] = useState({
    status: false,
    message: 'false',
  });

  const { update } = useStudentAuth();

  const handleSetName = (values) => {
    setName(values);
  };

  const handleNext = async () => {
    setErrorRequest({
      status: false,
      message: '',
    });

    const response = await update({
      name,
      avatar: images[selectedAvatar],
    });

    if (response.status === 500) {
      setErrorRequest({
        status: true,
        message: response.message,
      });
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
    <>
      <StyledContainer>
        <TopWrapper>
          <Title>Informações</Title>
          <Description>
            Escolha um nickname e um avatar para sua conta.
          </Description>
          <InputWrapper>
            <Input
              error={errorRequest.status}
              errorMessage={errorRequest.message}
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
          <StyledFlatList
            // numColumns={3}
            data={images}
            renderItem={({ item, index }) => (
              <AvatarWrapper
                key={item}
                isActive={index === selectedAvatar}
                onPress={() => setSelectedAvatar(index)}
              >
                <AvatarImage source={{ uri: `${API_URL}/avatars/${item}` }} />
              </AvatarWrapper>
            )}
            keyExtractor={(item) => item}
          />
        </MiddleWrapper>

        <BottomWrapper>
          <InputWrapper>
            <ButtonGradient onPress={handleNext} variant="primary">
              AVANÇAR
            </ButtonGradient>
          </InputWrapper>
        </BottomWrapper>
      </StyledContainer>
    </>
  );
};
export default ChooseNicknameAndAvatar;
