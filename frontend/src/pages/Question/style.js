import styled from 'styled-components';

import { Grid, AppBar, Button, Box } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons/';
import QuestionInput from './components/input';
import CheckBox from './components/checkbox';
import MyRadio from './components/radio';

export const StyledAppBar = styled(AppBar)`
  background: white;
`;

export const CardSelectQuestion = styled(Button)`
  height: 60px;
  background: ${({ isonscreen, theme }) =>
    isonscreen === 'true' ? theme.palette.primary.main : ''};
  color: ${({ isonscreen }) => (isonscreen === 'true' ? 'white' : '')};

  &&:hover {
    background: ${({ isonscreen, theme }) =>
      isonscreen === 'true' ? '' : theme.palette.primary.main};
    color: ${({ isonscreen, theme }) =>
      isonscreen === 'true' ? theme.palette.primary.main : 'white'};
  }
  && span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const WrapperCheckBoxRight = styled(GridItemStyledRight)`
  align-self: start;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  padding: 4px;
  width: 100%;
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
  border-radius: 0 5px 5px 0;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-left: none;
  outline: none;
  transition: border 0.3s linear;
`;

export const StyledTitleInput = styled(QuestionInput)`
  width: 100%;
  border: none;
  outline: none;
  padding: 20px 10px;
  background: white;
  text-align: center;
  font-weight: bolder;
  height: 100px;
  transition: border 0.3s linear;
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
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
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

export const StyledExitIcon = styled(ExitToApp)`
  transform: rotate(180deg);
`;

export const HiddenRadio = styled(MyRadio)`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const HiddenCheckBox = styled(CheckBox)`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const ShowOption = styled.span`
  cursor: pointer;
  height: 59px;
  width: 70px;
  //border: 2px solid rgba(0, 0, 0, 0.54);
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px 0 0 5px;
  background: ${({ checked, theme }) =>
    checked ? theme.palette.primary.main : 'white'};
  && svg {
    display: ${({ checked }) => (checked ? '' : 'none')};
    fill: white;
    margin-top: calc(100% - 48px);
    font-size: 2.5em;
  }
`;
