import styled from 'styled-components';

export const DownloadButton = styled.a`
  margin-top: 10px;
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.primary.main};
`;
