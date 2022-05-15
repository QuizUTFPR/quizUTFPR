import styled from 'styled-components';

import { Button } from '@mui/material';

export const StyledSearchTagButton = styled(Button)`
  height: 50px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TagItem = styled.div`
  padding: 10px;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin-top: 10px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  font-weight: bolder;
  opacity: 0.7;
  transition: all 0.5s ease;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;
