import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '@api';

// STYLES
import {
  ClassContainer,
  StyledScrollView,
  Title,
  DetailsContainer,
  DetailCard,
  StyledText,
  Subtitle,
  StyledDescription,
  Footer,
  TextCancel,
  CancelButton,
} from './style';

const InfoOfClass = () => {
  const route = useRoute();

  const { teacher, title, description, pin, amountOfQuizzes, subscribed } =
    route.params;
  const { name } = teacher;
  const navigation = useNavigation();

  const unSubscribeStudent = async () => {
    try {
      await api.delete('/class/dettachStudent', {
        params: {
          idClass: route.params.id,
        },
      });

      navigation.replace('ClassStack', {
        screen: 'InfoOfClass',
        params: {
          ...route.params,
          subscribed: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClassContainer fill="white">
      <StyledScrollView>
        <Title>{title}</Title>

        <DetailsContainer>
          {/* PIN */}
          <DetailCard width="39%">
            <MaterialIcons name="privacy-tip" size={24} color="white" />
            <StyledText>{pin}</StyledText>
          </DetailCard>

          {/* QTD QUIZZES */}
          <DetailCard width="20%">
            <MaterialCommunityIcons name="bookshelf" size={24} color="white" />
            <StyledText>{amountOfQuizzes}</StyledText>
          </DetailCard>

          {/* PROFESSOR */}
          <DetailCard width="39%">
            <MaterialCommunityIcons name="teach" size={24} color="white" />
            <StyledText numberOfLines={1}>{name}</StyledText>
          </DetailCard>
        </DetailsContainer>

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
