import styled from 'styled-components';

import { Button, Grid } from '@material-ui/core';
import { MathJax } from 'better-react-mathjax';
import { PreviewImage } from '../../style';

export const TitleQuestionMathJax = styled(MathJax)`
  text-align: center;
  font-weight: bolder;
`;

export const AnswerQuestionMathJax = styled(MathJax)`
  text-align: center;
`;

export const StyledSearchTagButton = styled(Button)`
  height: 50px;
`;

export const DemoContainer = styled(Grid).attrs({
  container: true,
  justifyContent: 'center',
})`
  margin-top: 20px;
`;

export const GridContainerDemoTitle = styled(Grid).attrs({
  container: true,
  justifyContent: 'center',
  alignItems: 'center',
})`
  max-width: 80%;
`;

export const GridContainerDemoAnswer = styled(Grid).attrs({
  container: true,
  justifyContent: 'center',
  alignItems: 'center',
})`
  margin-top: 20px;
  max-width: 80%;
`;

export const GridInputSimulator = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 3px;
`;

export const DemoPreviewImage = styled(PreviewImage)`
  margin: 0;
`;

export const GridImage = styled(Grid).attrs({
  item: true,
})`
  margin-bottom: 20px;
`;
