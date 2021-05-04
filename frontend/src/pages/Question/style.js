import styled from "styled-components";

import { Grid } from "@material-ui/core";

export const ContainerGrid = styled(Grid)`
  height: calc(100vh - 64px);
`;

export const StyledGrid = styled(Grid)`
  /* width: 20%; */
  height: 100%;
  /* background: palevioletred; */
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

export const StyledAddQuestionButton = styled(Grid)`
  /* background: blue; */
`;

export const StyledFieldOfQuestion = styled(Grid)`
  /* background: green; */
  height: 100%;
  padding: 20px;
  margin: 1px;
  /* height: calc(100vh - 48px - 48px); */
`;

export const StyledActionsButton = styled(Grid)`
  background: blue;
`;

export const StyledAnswerInput = styled.input`
  width: 100%;
  padding: 20px 10px;
  background: white;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  outline: none;

  :focus {
    border: 2px solid #ececec;
  }
`;

export const StyledTitleInput = styled(StyledAnswerInput)`
  text-align: center;
  font-weight: bolder;
`;
