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

export const Wrapper = styled.div`
  padding: 10px;
  /* border: 2px solid ${({ theme }) => theme.palette.primary.main}; */
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerDragZone = styled.div`
  cursor: pointer;
  width: 100%;
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

export const Label = styled(Typography)`
  position: absolute;
  top: -0.8em;
  left: 10px;
  background: white;
  padding: 0 5px;
`;

export const WrapperButton = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Description = styled.p`
  text-align: center;
  line-height: 1rem;
`;
