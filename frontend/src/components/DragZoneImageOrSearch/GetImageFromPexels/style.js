import styled from 'styled-components';

import { Pagination } from '@mui/material';
import Wrapper from '@components/RefferedContainer';

export const GridContainerModal = styled(Wrapper)`
  max-height: 90vh;
  flex-wrap: nowrap;
  overflow-y: scroll;
`;

export const WrapperImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const Image = styled.img`
  height: 250px;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const StyledPagination = styled(Pagination)`
  align-self: center;
  margin-top: 10px;
`;
