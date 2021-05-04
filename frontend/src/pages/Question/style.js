import styled from "styled-components";

import StyledButton from '@components/Button'
import { Grid } from "@material-ui/core";

export const ContainerGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

export const StyledGrid = styled(Grid)`
  height: 100%;
  padding: 20px;
`;

export const StyledRightGrid = styled(StyledGrid)`
  border-left: 1px solid;
`;

export const StyledLeftGrid = styled(StyledGrid)`
  border-right: 1px solid;


`;

export const StyledButtonsContainer = styled(Grid)`
  margin-top: 5px;
`;

export const GridRegisterQuestion = styled(Grid)`
  align-self: flex-end;
`
export const StyledAnswerInput = styled.input`
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
`;

export const GridButtonNewQuestion = styled(Grid)`
  &&{
    align-self: flex-end;
  }
`