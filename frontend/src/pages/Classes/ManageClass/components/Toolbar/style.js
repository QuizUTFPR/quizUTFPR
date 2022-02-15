import styled from 'styled-components';

import { ExitToApp } from '@mui/icons-material/';
import { Typography, Avatar } from '@mui/material';

export const ToolBar = styled.header`
  width: 100vw;
  border-bottom: 1px solid #e5e5e5;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const WrapperTeacher = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledAvatar = styled(Avatar)``;

export const NameTeacher = styled(Typography)`
  font-size: 1rem;
  margin-left: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledExitIcon = styled(ExitToApp)`
  transform: rotate(180deg);
`;

export const ClassName = styled(Typography)`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;
