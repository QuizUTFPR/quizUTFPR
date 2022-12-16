import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import { List, Divider, Avatar, Tooltip } from '@mui/material';
import {
  Help,
  Home,
  LibraryBooks,
  ExitToApp,
  ArrowBackIos,
  ArrowForwardIos,
  School,
} from '@mui/icons-material';

// HOOKS
import useAuth from '@hooks/Auth';

// ROTAS
import { QUIZ, HOME, CLASSES, FAQ } from '@routes';

// STYLES
import {
  StyledDrawer,
  AvatarBox,
  TextBox,
  StyledBadge,
  AdminName,
  AdminDescription,
  WrapperLine,
  TextLine,
  IconLine,
  Line,
  StyledIconButton,
} from './style';

const MenuDrawer = () => {
  const { teacherInfo, logout } = useAuth();
  const { pathname } = useLocation();

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
    {
      text: 'Meus Quizzes',
      icon: <LibraryBooks />,
      to: QUIZ,
    },
    {
      text: 'Minhas Turmas',
      icon: <School />,
      to: CLASSES,
    },
  ];

  const SecondMenu = [
    {
      text: 'Dúvidas Frequentes',
      icon: <Help />,
      to: FAQ,
    },
    {
      text: 'Desconectar',
      icon: <ExitToApp />,
      onClick: logout,
    },
  ];

  return (
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
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={teacherInfo?.teacher?.name?.toUpperCase()}
              src={teacherInfo?.teacher?.picture}
            />
            <TextBox>
              <AdminName color="primary">{teacherInfo?.teacher.name}</AdminName>
              <AdminDescription color="primary">UTFPR</AdminDescription>
            </TextBox>
          </>
        </AvatarBox>
      )}

      {open && <Divider />}
      <List>
        {FirstMenu.map((option) => (
          <Tooltip
            key={option.text}
            title={open ? '' : option.text}
            placement="right"
          >
            <WrapperLine to={option.to}>
              <Line open={open} isActive={option.to === pathname}>
                <IconLine open={open}>{option.icon}</IconLine>
                {open && <TextLine color="primary">{option.text}</TextLine>}
              </Line>
            </WrapperLine>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List>
        {SecondMenu.map((option) => {
          let options = { ...option };

          if (option?.onClick) {
            options = {
              ...option,
              as: 'div',
            };
          }

          return (
            <Tooltip
              key={option.text}
              title={open ? '' : option.text}
              placement="right"
            >
              <WrapperLine {...options}>
                <Line open={open}>
                  <IconLine open={open}>{option.icon}</IconLine>
                  {open && <TextLine color="primary">{option.text}</TextLine>}
                </Line>
              </WrapperLine>
            </Tooltip>
          );
        })}
      </List>
    </StyledDrawer>
  );
};

export default MenuDrawer;
