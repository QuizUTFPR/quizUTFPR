import styled, {keyframes} from 'styled-components'

import {
  Drawer,
  Badge,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  ListItem
} from '@material-ui/core';

const WidthDrawer = '210px';

export const StyledDrawer = styled(Drawer)`
  width: ${WidthDrawer};
`

export const AvatarBox = styled(Box)`
  && {
    display: flex;
    padding: 20px;
    margin: 20px 0 20px 0;
  }
`
export const TextBox = styled(Box)`
  && {
    margin-left: 20px;
  }
`

const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }

  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

export const StyledBadge = styled(Badge)`
  
 && span{ 
  background-color: #44b700;
  color: #44b700;
  box-shadow: 0 0 0 2px whitesmoke;


  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${ripple} 1.2s infinite ease-in-out;
    border: 1px solid currentColor;
    content: '""';
  }
 }
`
export const AdminName = styled(Typography)`
  font-weight: bolder;
  font-size: 1.1em;
`

export const AdminDescription = styled(Typography)`
  font-size: 0.9em;
  font-weight: 500;
  opacity: 0.8;
`

export const StyledListItem = styled(ListItem)`
  color: ${({theme}) => theme.palette.primary.main};
`


export const StyledListItemIcon = styled(ListItemIcon)`
  color: ${({theme}) => theme.palette.primary.main};
`

export const StyledListItemText = styled(ListItemText)`
  color: ${({theme}) => theme.palette.primary.main};
`