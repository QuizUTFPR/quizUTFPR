import React from 'react';

import {
  List,
  Divider,
  Avatar 
} from '@material-ui/core';

import {
  Help,
  Home,
  Class,
  LibraryBooks,
  ExitToApp
} from '@material-ui/icons';

import {
  StyledDrawer,
  AvatarBox,
  TextBox,
  StyledBadge,
  AdminName,
  AdminDescription,
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem
} from './style'

const MenuDrawer = () => {

  const FirstMenu = [
    {
      text: 'Inicio',
      icon: <Home />
    },
    {
      text: 'Minhas Turmas',
      icon: <Class />
    },
    {
      text: 'Meus Quizzes',
      icon: <LibraryBooks />
    }
  ]

  const SecondMenu = [
    {
      text: 'FAQ',
      icon: <Help />
    },
    {
      text: 'Desconectar',
      icon: <ExitToApp />
    }
  ]

  return (
    <StyledDrawer
        variant="permanent"
        anchor="left"
      >
        <AvatarBox>
          <StyledBadge
            overlap="circle" variant="dot"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
            <Avatar alt="Remy Sharp" src="https://image.flaticon.com/icons/png/512/147/147144.png" />
          </StyledBadge>
          
          <TextBox>
            <AdminName color='primary'>Professor Oclim</AdminName>
            <AdminDescription color='primary'>UTFPR</AdminDescription>
          </TextBox>
        </AvatarBox>

        <Divider />
        <List>
          {FirstMenu.map((option) => (
            <StyledListItem button key={option.text}>
              <StyledListItemIcon>{option.icon}</StyledListItemIcon>
              <StyledListItemText color='primary' primary={option.text} />
            </StyledListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SecondMenu.map((option) => (
            <StyledListItem button key={option.text}>
              <StyledListItemIcon>{option.icon}</StyledListItemIcon>
              <StyledListItemText primary={option.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
  );
}


export default MenuDrawer;