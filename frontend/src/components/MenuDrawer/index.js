import React from 'react';

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  AvatarBox,
  TextBox,
  StyledBadge,
  AdminName,
  AdminDescription
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
    <Drawer
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
            <ListItem button key={option.text}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText color='primary' primary={option.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SecondMenu.map((option) => (
            <ListItem button key={option.text}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}


export default MenuDrawer;