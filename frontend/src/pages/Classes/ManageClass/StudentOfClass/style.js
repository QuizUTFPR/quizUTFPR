import styled from 'styled-components';
import { Avatar, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)``;

export const StudentsWrapper = styled.div`
  box-shadow: 1px 1px 8px -3px rgb(54 48 48 / 49%);
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

export const NoStudentsWarning = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 400;
  text-align: center;
`;

export const Student = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-top: 0px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  image-rendering: pixelated;

  @media (max-width: 450px) {
    width: 40px;
    height: 40px;
  }
`;

export const WrapperText = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

export const Text = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TextBold = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ActionsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const StyledIconButton = styled(IconButton)`
  width: fit-content;
`;
