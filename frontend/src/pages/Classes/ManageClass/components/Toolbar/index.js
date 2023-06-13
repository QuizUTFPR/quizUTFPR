import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import StyledButton from '@components/Button';

// Routes
import { CLASSES } from '@routes';

// HOOKS
import useAuth from '@hooks/Auth';

// Style
import {
  ToolBar,
  StyledExitIcon,
  StyledAvatar,
  NameTeacher,
  WrapperTeacher,
  // ClassName,
} from './style';

const CustomToolBar = () => {
  const navigate = useNavigate();
  const { teacherInfo } = useAuth();
  // const location = useLocation();

  console.log(teacherInfo);

  return (
    <ToolBar>
      <StyledButton
        onClick={() => navigate(CLASSES)}
        color="primary"
        startIcon={<StyledExitIcon />}
        size="large"
        loading={false}
      >
        Voltar
      </StyledButton>

      {/* <ClassName>{location?.state?.title || 'Sem Título'}</ClassName> */}

      <WrapperTeacher>
        <img
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
          }}
          alt={teacherInfo?.teacher?.name?.toUpperCase()}
          src={teacherInfo?.teacher?.picture}
          referrerPolicy="no-referrer"
        />
        <NameTeacher>{teacherInfo.teacher.name}</NameTeacher>
      </WrapperTeacher>
    </ToolBar>
  );
};

export default CustomToolBar;
