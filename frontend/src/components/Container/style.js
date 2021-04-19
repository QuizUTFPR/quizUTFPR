import styled from 'styled-components'

import { 
  Grid
} from '@material-ui/core';

export const GridContainer = styled(Grid)`
  padding: 20px;
  margin: 30px;
  background: ${({theme}) => theme.palette.background.bgContainer};
  border-radius: 5px;
  max-width: calc(100% - 210px - 60px);
  overflow-wrap: break-word;
`