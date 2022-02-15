import styled from 'styled-components';

import Wrapper from './wrapper';

export const StyledWrapper = styled(Wrapper)`
  display: ${({ isVisible }) => (isVisible ? 'none' : '')};
`;
