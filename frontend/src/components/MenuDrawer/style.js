import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { Drawer, Badge, Typography, Box, IconButton } from '@mui/material';

const WidthDrawer = '210px';
const WidthIcon = '60px;';

export const StyledIconButton = styled(IconButton)`
  margin-left: ${({ open }) => (open ? WidthDrawer : '5px')};
  width: ${WidthIcon};
`;

export const StyledDrawer = styled(Drawer)`
  && .MuiDrawer-paper {
    width: ${({ open }) => (open ? `calc(${WidthDrawer} + 50px)` : WidthIcon)};
    overflow-x: hidden;
    transition: 0.5s;
  }

  width: ${({ open }) => (open ? `calc(${WidthDrawer} + 50px)` : WidthIcon)};

  /* && div {
    width: ${({ open }) => !open && '55px'};
    transition: all 0.2s ease;
  } */
  transition: 0.5s;
`;

export const AvatarBox = styled(Box)`
  && {
    display: flex;
    padding: 20px;
    margin: 20px 0 20px 0;
  }
`;
export const TextBox = styled(Box)`
  && {
    margin-left: 20px;
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }

  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

export const StyledBadge = styled(Badge)`
  && span {
    background-color: #44b700;
    color: #44b700;
    box-shadow: 0 0 0 2px whitesmoke;

    ::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ${ripple} 1.2s infinite ease-in-out;
      border: 1px solid currentColor;
      content: '""';
    }
  }
`;
export const AdminName = styled(Typography)`
  font-weight: bolder;
  font-size: 1rem;
`;

export const AdminDescription = styled(Typography)`
  font-size: 0.9em;
  font-weight: 500;
  opacity: 0.8;
`;

export const WrapperLine = styled(Link)`
  text-decoration: none;
  display: flex;
  cursor: pointer;

  :not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 20px;
  align-items: center;
  border-radius: 16px;
  transition: all 0.2s ease;

  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ isActive }) => (isActive ? '#dbdbdb' : 'white')};
  margin: ${({ open }) => (open ? '0 10px' : '')};
  justify-content: ${({ open }) => (!open ? 'center' : '')};

  :hover {
    background: #dbdbdb;
  }
`;

export const IconLine = styled.div`
  display: flex;
  margin-right: ${({ open }) => (open ? '10px' : '')};

  color: ${({ theme }) => theme.palette.primary.main};
`;

export const TextLine = styled.p`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1rem;
  font-weight: 500;
`;
