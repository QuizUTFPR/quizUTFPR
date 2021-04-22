import styled from "styled-components";

import { Grid } from "@material-ui/core";

export const ContainerGrid = styled(Grid)``;

export const StyledGrid = styled(Grid)`
  /* width: 20%; */
  height: 100vh;
  /* background: palevioletred; */
`;

export const StyledRightGrid = styled(StyledGrid)`
  border-left: 1px solid;
`;

export const StyledLeftGrid = styled(StyledGrid)`
  border-right: 1px solid;
`;

export const StyledAddQuestionButton = styled(Grid)`
  /* background: blue; */
`;

export const StyledFieldOfQuestion = styled(Grid)`
  /* background: green; */
  height: calc(100vh - 48px - 48px);
`;

export const StyledActionsButton = styled(Grid)`
  background: blue;
`;

export const StyledDividerGrid = styled(Grid)`
  width: "fit-content";
`;
