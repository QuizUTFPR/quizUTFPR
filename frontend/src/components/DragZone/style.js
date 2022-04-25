import styled from 'styled-components';

import { Typography } from '@mui/material';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const Container = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const Wrapper = styled.div`
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
  position: relative;
`;

export const Label = styled(Typography)`
  position: absolute;
  top: -0.8em;
  left: 10px;
  background: white;
  padding: 0 5px;
`;
