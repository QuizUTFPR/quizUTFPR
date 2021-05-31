import styled from 'styled-components';

export const ErrorMessage = styled.p`
  font-weight: bolder;
  margin-left: 10px;
`;

export const ErrorWrapper = styled.div`
  color: white;
  display: flex;
  height: 50px;
  align-items: center;
  opacity: 0.8;
  justify-content: center;
  border-radius: 3px;
  width: 100%;
  background: ${({ theme }) => theme.palette.error.dark};
`;
