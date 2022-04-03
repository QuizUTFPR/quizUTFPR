import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import api from '@api';
import theme from '@theme';

// HOOKS
import useClass from '@hook/useClass';

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

  const { teacher, title, description, pin, amountOfQuizzes, subscribed } =
    classData;
  const { name } = teacher;

  const unSubscribeStudent = async () => {
    try {
      await api.delete('/class/dettachStudent', {
        params: {
          idClass: classData.id,
        },
      });

      handleSetClassData((prevState) => ({
        ...prevState,
        subscribed: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log('montou');

    return () => console.log('desmontou');
  }, []);

  return (
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
            <TextCancel onPress={unSubscribeStudent}>
              Cancelar Inscrição
            </TextCancel>
          )}
        </CancelButton>
      </Footer>
    </ClassContainer>
  );
};

export default InfoOfClass;
