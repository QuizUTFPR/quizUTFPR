import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import StyledButton from '@components/Button';

// Style
import {
  ToolBar,
  StyledExitIcon,
  StyledAvatar,
  NameTeacher,
  WrapperTeacher,
  ClassName,
} from './style';

const CustomToolBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ToolBar>
      <StyledButton
        onClick={() => navigate(-1)}
        color="primary"
        startIcon={<StyledExitIcon />}
        size="large"
      >
        Sair
      </StyledButton>

      <ClassName>{location?.state?.title || 'Sem Título'}</ClassName>

      <WrapperTeacher>
        <StyledAvatar src="https://image.flaticon.com/icons/png/512/147/147144.png" />
        <NameTeacher>Jhonatan Cunha</NameTeacher>
      </WrapperTeacher>
    </ToolBar>
  );
};

export default CustomToolBar;