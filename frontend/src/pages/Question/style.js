import styled from 'styled-components';

import { Grid, AppBar, Button, Box } from '@material-ui/core';
import QuestionInput from './components/input';

export const StyledAppBar = styled(AppBar)`
  background: white;
`;

export const CardSelectQuestion = styled(Button)`
  height: 60px;
  width: 100%;
  background: ${({ isonscreen, theme }) =>
    isonscreen === 'true' ? theme.palette.primary.main : ''};
  color: ${({ isonscreen }) => (isonscreen === 'true' ? 'white' : '')};

  &&:hover {
    background: ${({ isonscreen, theme }) =>
      isonscreen === 'true' ? '' : theme.palette.primary.main};
    color: ${({ isonscreen, theme }) =>
      isonscreen === 'true' ? theme.palette.primary.main : 'white'};
  }
`;

export const ContainerGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

export const StyledGrid = styled(Grid)`
  height: 100%;
  padding: 20px;
`;

export const GridItemStyledRight = styled(Grid)`
  margin-bottom: 20px;
`;

export const StyledRightGrid = styled(StyledGrid)`
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background: white;
`;

export const StyledLeftGrid = styled(StyledGrid)`
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background: white;
`;

export const StyledButtonsContainer = styled(Grid)`
  margin-top: 5px;
`;

export const GridRegisterQuestion = styled(Grid)`
  align-self: flex-end;
`;
export const StyledAnswerInput = styled(QuestionInput)`
  width: 100%;
  padding: 20px 10px;
  background: white;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: border 0.3s linear;

  &:focus {
    border: 2px solid #ececec;
  }
`;

export const StyledTitleInput = styled(StyledAnswerInput)`
  text-align: center;
  font-weight: bolder;
  height: 100px;
  font-size: 1.2em;
`;

export const GridButtonNewQuestion = styled(Grid)`
  && {
    align-self: flex-end;
  }
`;

export const PreviewImage = styled.img`
  max-width: 400px;
  margin-bottom: -40px;
`;

export const GridQuestions = styled(Grid)`
  overflow-y: auto;
  height: calc(100vh - 250px);
`;

export const StyledMessage = styled.span`
  font-weight: bolder;
  margin-right: 10px;
  padding-left: 5px;
`;

export const BoxStyledAction = styled(Box)`
  display: flex;
  align-items: center;
`;

export const WrapperMessage = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.6;
`;

export const CopiedQuestionMessage = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  && {
    span {
      margin-left: 10px;
    }
  }

  opacity: 0.5;
  font-weight: bolder;
`;
