import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import Card from '@components/Card';
import GridContainer from '@components/Container';
import Modal from '@components/Modal';
import Tooltip from '@components/ToolTip';

// MATERIAL-UI COMPONENTS
import { Grid, Typography, Divider, Button, IconButton } from '@mui/material';

// MATERIAL-UI ICONS
import { Edit } from '@mui/icons-material';

// ROUTES
import { CREATE_CLASS } from '@routes';

// MODALS
import EditClass from './EditClass';

// STYLE
import { TextPIN } from './style';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      const { data, status } = await api.get('/class/getAllTeacherClasses');

      console.log('data', data);

      if (status !== 200) setClasses(false);

      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [modalEdit, setModalEdit] = useState({
    status: false,
    classData: null,
  });

  const handleCloseEditModal = () => {
    setModalEdit({ status: false, class: null });
    getClasses();
  };

  const handleOpenEditModal = (classData) => () => {
    setModalEdit({
      status: true,
      classData,
    });
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <>
      <GridContainer container spacing={3}>
        <Grid container align="center" justifyContent="space-between">
          <Typography color="primary" component="h4" variant="h4">
            Minhas Turmas
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={CREATE_CLASS}
          >
            Criar Turma
          </Button>
        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        {!classes ? (
          <p>Vazio!</p>
        ) : (
          classes.map((classInstance) => (
            <Card
              key={classInstance.id}
              image={classInstance?.imageClass?.url}
              imageTile={classInstance.title}
              title={classInstance.title}
              description={classInstance.description}
              to="#"
            >
              <Tooltip arrow ariaLabel="pin" title="PIN utilizado pelo aluno">
                <TextPIN>{classInstance.pin}</TextPIN>
              </Tooltip>
              <Tooltip arrow ariaLabel="editar" title="Editar">
                <IconButton onClick={handleOpenEditModal(classInstance)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Card>
          ))
        )}
      </GridContainer>

      {/* MODALS */}
      <Modal
        open={modalEdit.status}
        modalTitle="Prefêrencias da Turma"
        modalDescription="Edite os dados de sua turma..."
        style={{ overflow: 'scroll' }}
        handleClose={handleCloseEditModal}
      >
        <EditClass
          classObj={modalEdit.classData}
          handleClose={handleCloseEditModal}
        />
      </Modal>
    </>
  );
};

export default MyClasses;
