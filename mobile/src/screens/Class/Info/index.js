import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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

const InfoOfClass = ({ route }) => {
  const { teacher, title, description, pin, amountOfQuizzes, subscribed } =
    route.params;
  const { name } = teacher;

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
            <TextCancel onPress={console.log('cancelou')}>
              Cancelar Inscrição
            </TextCancel>
          )}
        </CancelButton>
      </Footer>
    </ClassContainer>
  );
};

export default InfoOfClass;
