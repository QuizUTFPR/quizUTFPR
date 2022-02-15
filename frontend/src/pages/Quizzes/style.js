import styled from 'styled-components';
import { Grid, Typography, Divider } from '@mui/material';

export const TextPIN = styled.p`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bolder;
`;

export const HeaderTitle = styled(Grid)`
  margin-bottom: 10px;
`;

export const HeaderTitleText = styled(Typography)`
  font-weight: 500;
  font-size: 2.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 90%;
  text-align: left;
`;

export const HeaderDivider = styled(Divider)`
  margin-bottom: 20px;
`;
