import React, { useState } from 'react';

// COMPONENTS
import { Link } from 'react-router-dom';
import { List, Divider, Avatar } from '@material-ui/core';
import {
  Help,
  Home,
  // Class,
  LibraryBooks,
  ExitToApp,
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons';

// HOOKS
import useAuth from '@hooks/Auth';

// ROTAS
import { QUIZ, HOME } from '@routes';

// STYLES
import {
  StyledDrawer,
  AvatarBox,
  TextBox,
  StyledBadge,
  AdminName,
  AdminDescription,
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledIconButton,
} from './style';

const MenuDrawer = () => {
  const { teacherInfo, logout } = useAuth();

  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const FirstMenu = [
    {
      text: 'Inicio',
      icon: <Home />,
      to: HOME,
    },
    // {
    //   text: 'Minhas Turmas',
    //   icon: <Class />,
    //   to: CLASSES,
    // },
    {
      text: 'Meus Quizzes',
      icon: <LibraryBooks />,
      to: QUIZ,
    },
  ];

  const SecondMenu = [
    {
      text: 'FAQ',
      icon: <Help />,
      onClick: () => console.log('FAQ'),
    },
    {
      text: 'Desconectar',
      icon: <ExitToApp />,
      onClick: logout,
    },
  ];

  return (
    <>
      <StyledDrawer open={open} variant="permanent" anchor="left">
        <StyledIconButton
          open={open}
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
        >
          {open ? (
            <ArrowBackIos color="primary" />
          ) : (
            <ArrowForwardIos color="primary" />
          )}
        </StyledIconButton>

        <Divider />

        {open && (
          <AvatarBox>
            <>
              <StyledBadge
                overlap="circular"
                variant="dot"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://image.flaticon.com/icons/png/512/147/147144.png"
                />
              </StyledBadge>

              <TextBox>
                <AdminName color="primary">
                  {teacherInfo.teacher.name}
                </AdminName>
                <AdminDescription color="primary">UTFPR</AdminDescription>
              </TextBox>
            </>
          </AvatarBox>
        )}

        {open && <Divider />}
        <List>
          {FirstMenu.map((option) => (
            <Link
              key={option.text}
              to={option.to}
              style={{ textDecoration: 'none' }}
            >
              <StyledListItem button key={option.text}>
                <StyledListItemIcon>{option.icon}</StyledListItemIcon>
                <StyledListItemText color="primary" primary={option.text} />
              </StyledListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {SecondMenu.map((option) => (
            <StyledListItem button key={option.text} onClick={option.onClick}>
              <StyledListItemIcon>{option.icon}</StyledListItemIcon>
              <StyledListItemText primary={option.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default MenuDrawer;
