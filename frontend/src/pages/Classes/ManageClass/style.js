import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  margin-top: 40px;
  border-radius: 8px;
  width: 90vw;
`;

export const WrapperMenuContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
  gap: 10px;
`;

export const ItemMenuContent = styled.div`
  cursor: pointer;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.primary.main : '#dbdbdb'};
  transition: all 0.2s ease-in-out;
  margin: 5px 0;
  border-radius: 8px;

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Content = styled.div`
  padding: 20px;
`;
