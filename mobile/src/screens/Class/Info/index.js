import React, { useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import api from '@api';
import theme from '@theme';

// COMPONENTS
import Dialog from '@components/Dialog';

// HOOKS
import useClass from '@hook/useClass';
import useStudentAuth from '@hook/useStudentAuth';

// LOTTIE
import SadEmote from '@assets/lottie/sad_emote.json';

// STYLES
import {
  ClassContainer,
  StyledScrollView,
  Title,
  DetailCard,
  StyledText,
  Subtitle,
  StyledDescription,
  Footer,
  TextCancel,
  CancelButton,
} from './style';

const InfoOfClass = () => {
  const { classData, handleSetClassData } = useClass();
  const [isConfirmExitVisible, setIsConfirmExitVisible] = useState(false);

  const showConfirmExit = () => setIsConfirmExitVisible(true);
  const hideConfirmExit = () => setIsConfirmExitVisible(false);

  const {
    studentInfo: { student },
  } = useStudentAuth();

  const { teacher, title, description, pin, amountOfQuizzes, subscribed } =
    classData;

  const { name } = teacher;

  const unSubscribeStudent = async () => {
    try {
      await api.delete('/class/dettachStudent', {
        params: {
          idClass: classData.id,
          studentId: student.id,
        },
      });

      handleSetClassData((prevState) => ({
        ...prevState,
        subscribed: false,
      }));

      hideConfirmExit();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log('montou');

    return () => console.log('desmontou');
  }, []);

  return (
    <>
      <ClassContainer fill="white">
        <StyledScrollView>
          <Title>{title}</Title>

          {/* PIN */}
          <DetailCard>
            <MaterialIcons
              name="privacy-tip"
              size={24}
              color={theme.color.blackRussian}
            />
            <StyledText>{pin}</StyledText>
          </DetailCard>

          {/* QTD QUIZZES */}
          <DetailCard>
            <MaterialCommunityIcons
              name="bookshelf"
              size={24}
              color={theme.color.blackRussian}
            />
            <StyledText>{amountOfQuizzes}</StyledText>
          </DetailCard>

          {/* PROFESSOR */}
          <DetailCard>
            <MaterialCommunityIcons
              name="teach"
              size={24}
              color={theme.color.blackRussian}
            />
            <StyledText numberOfLines={1}>{name}</StyledText>
          </DetailCard>

          <Subtitle>Descrição</Subtitle>
          <StyledDescription>{description}</StyledDescription>
        </StyledScrollView>

        <Footer>
          <CancelButton>
            {subscribed && (
              <TextCancel
                onPress={showConfirmExit}
                // onPress={unSubscribeStudent}
              >
                Cancelar Inscrição
              </TextCancel>
            )}
          </CancelButton>
        </Footer>
      </ClassContainer>

      <Dialog
        title="JÁ VAI? ESTÁ CEDO!"
        visible={isConfirmExitVisible}
        hideDialog={hideConfirmExit}
        firstButtonOnPress={hideConfirmExit}
        secondButtonOnPress={unSubscribeStudent}
        firstButtonLabel="VOLTAR"
        secondButtonLabel="SAIR DA TURMA"
        lottieAnimation={
          <LottieView
            autoPlay
            loop={false}
            style={{ width: 150 }}
            resizeMode="cover"
            speed={0.5}
            source={SadEmote}
          />
        }
        childrenText="Tem certeza que quer sair? Todas as informações e progressos serão perdidos ao sair da turma..."
      />
    </>
  );
};

export default InfoOfClass;
