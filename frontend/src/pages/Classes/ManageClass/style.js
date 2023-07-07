import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const WrapperMenu = styled.div`
  display: flex;
  margin-top: 40px;
  width: 90vw;
  justify-content: center;
  padding: 0 10px;
  border-radius: 4px;
  background: white;
  gap: 10px;
  box-shadow: 1px 1px 8px -3px rgb(54 48 48 / 49%);
  border: 1px solid gray;
`;

export const Wrapper = styled.div`
  margin-top: 20px;
  width: 90vw;
`;

export const ItemMenuContent = styled.div`
  cursor: pointer;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.primary.main : '#dbdbdb'};
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid
    ${({ isActive, theme }) =>
      isActive ? theme.palette.primary.main : 'white'};

  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
    background: #f9f9f9;
    border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
  }
`;

export const ClassName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
