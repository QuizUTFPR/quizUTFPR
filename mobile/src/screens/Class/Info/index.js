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
  StyledCancel,
} from './style';

const InfoOfClass = () => (
  <ClassContainer fill="white">
    <StyledScrollView>
      <Title>Título da Turma</Title>

      <DetailsContainer>
        {/* PIN */}
        <DetailCard>
          <MaterialIcons name="privacy-tip" size={24} color="black" />
          <StyledText>124114</StyledText>
        </DetailCard>

        {/* QTD QUIZZES */}
        <DetailCard>
          <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
          <StyledText>10</StyledText>
        </DetailCard>

        {/* PROFESSOR */}
        <DetailCard>
          <MaterialCommunityIcons name="teach" size={24} color="black" />
          <StyledText numberOfLines={1}>Ivanilton Polato</StyledText>
        </DetailCard>
      </DetailsContainer>

      <Subtitle>Descrição</Subtitle>
      <StyledDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </StyledDescription>
    </StyledScrollView>

    <Footer>
      <StyledCancel onPress={console.log('cancelou')}>
        Cancelar Inscrição
      </StyledCancel>
    </Footer>
  </ClassContainer>
);

export default InfoOfClass;
