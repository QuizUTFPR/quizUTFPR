import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// Components
import Input from '@components/Input';
import ButtonGradient from '@components/ButtonGradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from '@components/Toast';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// Styles
import {
  InputWrapper,
  WrapperHeader,
  StyledContainer,
  Title,
  Description,
  GoBackButtonWrapper,
  StyledIconButton,
  TopWrapper,
  MiddleWrapper,
  BottomWrapper,
} from './style';

const Feedback = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });
  };

  const { studentInfo } = useStudentAuth();

  const handleSetMessage = (values) => setMessage(values);

  const handleSendFeedback = async () => {
    try {
      setLoading(true);
      await api.post('/studentFeedback/create', {
        message,
        studentId: studentInfo.student.id,
      });

      setShowToast({
        open: true,
        message: 'Feedback enviado com sucesso!',
        type: 'success',
      });

      setMessage('');
    } catch (error) {
      setShowToast({
        open: true,
        message: error.response.data.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledContainer>
        <WrapperHeader>
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="white" />
            </StyledIconButton>
          </GoBackButtonWrapper>
        </WrapperHeader>

        <TopWrapper>
          <Title>Feedback</Title>
          <Description>
            Digite na caixa abaixo sugestões de melhorias e problemas
            encontrados durante a utilização do aplicativo.
          </Description>
        </TopWrapper>

        <MiddleWrapper>
          <InputWrapper>
            <Input
              fill="black"
              label="Mensagem"
              placeholder="Escreva um bug encontrado ou um sugestão de melhoria..."
              multiline
              height="100%"
              textAlignVertical="top"
              paddingWrapper="10px 0"
              value={message}
              onChangeText={handleSetMessage}
              // blurOnSubmit={false}
            />
          </InputWrapper>
        </MiddleWrapper>

        <BottomWrapper>
          <InputWrapper>
            <ButtonGradient
              loading={loading}
              onPress={handleSendFeedback}
              variant="primary"
              title="ENVIAR"
            />
          </InputWrapper>
        </BottomWrapper>
      </StyledContainer>
      <Toast
        type={showToast.type}
        handleClose={handleCloseToast}
        open={showToast.open}
        timeToErase={3000}
      >
        {showToast.message}
      </Toast>
    </>
  );
};

export default Feedback;
