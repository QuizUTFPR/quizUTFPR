import styled from 'styled-components';

import Box from '@material-ui/core/Box';

export const BoxWrapperStyled = styled(Box)`
  width: 100%;
`;

export const TabBoxStyled = styled(Box).attrs({
  sx: { borderBottom: 1, borderColor: 'divider' },
})``;

export const LabelWrapper = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
