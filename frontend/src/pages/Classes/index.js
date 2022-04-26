import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import Card from '@components/Card';
import Container from '@components/Container';
import Modal from '@components/Modal';
import Tooltip from '@components/ToolTip';
import ConfirmRemove from '@components/ConfirmRemove';

// MATERIAL-UI COMPONENTS
import {
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

// MATERIAL-UI ICONS
import { Edit, FileCopy, Delete, ExpandMore } from '@mui/icons-material';

// ROUTES
import { CREATE_CLASS, MANAGE_CLASSES } from '@routes';

// MODALS
import EditClass from './EditClass';
import CloneCLass from './CloneClass';

// STYLE
import {
  TextPIN,
  HeaderTitle,
  HeaderTitleText,
  HeaderDivider,
  CategoryTitle,
  WarningText,
  StyledAccordion,
  ClassesQuantity,
  ClassBar,
} from './style';

const MyClasses = () => {
  const [classes, setClasses] = useState({});
  console.log('CLASSES', classes);

  const [modalEdit, setModalEdit] = useState({
    status: false,
    classData: null,
  });

  const [modalClone, setModalClone] = useState({
    status: false,
    classData: null,
  });

  const [modalDelete, setModalDelete] = useState({
    open: false,
    idClass: null,
  });

  const getClasses = async () => {
    try {
      const { data, status } = await api.get('/class/getAllTeacherClasses');

      if (status !== 200) setClasses(false);

      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveClass = async () => {
    try {
      await api.delete('/class/delete', {
        data: {
          id: modalDelete.idClass,
        },
      });

      getClasses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalDelete = (idClass) => () =>
    setModalDelete({ open: true, idClass });

  const handleCloseModalDelete = () =>
    setModalDelete({ open: false, idClass: null });

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

  const handleCloseCloneModal = () => {
    setModalClone({ status: false, class: null });
    getClasses();
  };

  const handleOpenCloneModal = (classData) => () => {
    setModalClone({
      status: true,
      classData,
    });
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <>
      <Container container>
        <HeaderTitle container align="center" justifyContent="space-between">
          <HeaderTitleText color="primary">Minhas Turmas</HeaderTitleText>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={CREATE_CLASS}
          >
            Criar Turma
          </Button>
        </HeaderTitle>

        <HeaderDivider />

        {!classes?.public?.length ? (
          <StyledAccordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <ClassBar>
                <CategoryTitle>Turmas Públicas</CategoryTitle>
                <ClassesQuantity>(0 turmas)</ClassesQuantity>
              </ClassBar>
            </AccordionSummary>
            <AccordionDetails>
              <WarningText>Nenhuma turma pública encontrada!</WarningText>
            </AccordionDetails>
          </StyledAccordion>
        ) : (
          <StyledAccordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <ClassBar>
                <CategoryTitle>Turmas Públicas</CategoryTitle>
                <ClassesQuantity>
                  ({classes.public.length} turmas)
                </ClassesQuantity>
              </ClassBar>
            </AccordionSummary>
            <AccordionDetails>
              {classes?.public.map((classInstance, index) => (
                <Card
                  key={classInstance.id}
                  image={classInstance?.imageClass?.url}
                  imageTitle={classInstance.title}
                  title={classInstance.title}
                  description={classInstance.description}
                  to={`${MANAGE_CLASSES}/${classInstance.id}`}
                >
                  <Tooltip
                    arrow
                    ariaLabel="pin"
                    title="PIN para acessar a turma"
                  >
                    <TextPIN>{classInstance.pin}</TextPIN>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="editar" title="Editar">
                    <IconButton onClick={handleOpenEditModal(classInstance)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="clonar" title="Clonar Turma">
                    <IconButton onClick={handleOpenCloneModal(classInstance)}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="deletar" title="Deletar Turma">
                    <IconButton
                      onClick={handleOpenModalDelete(classInstance.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Card>
              ))}
            </AccordionDetails>
          </StyledAccordion>
        )}

        {!classes?.private?.length ? (
          <StyledAccordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <ClassBar>
                <CategoryTitle>Turmas Privadas</CategoryTitle>
                <ClassesQuantity>(0 turmas)</ClassesQuantity>
              </ClassBar>
            </AccordionSummary>
            <AccordionDetails>
              <WarningText>Nenhuma turma privada encontrada!</WarningText>
            </AccordionDetails>
          </StyledAccordion>
        ) : (
          <StyledAccordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <ClassBar>
                <CategoryTitle>Turmas Privadas</CategoryTitle>
                <ClassesQuantity>
                  ({classes.private.length} turmas)
                </ClassesQuantity>
              </ClassBar>
            </AccordionSummary>
            <AccordionDetails>
              {classes?.private.map((classInstance) => (
                <Card
                  key={classInstance.id}
                  image={classInstance?.imageClass?.url}
                  imageTitle={classInstance.title}
                  title={classInstance.title}
                  description={classInstance.description}
                  to={`${MANAGE_CLASSES}/${classInstance.id}`}
                >
                  <Tooltip
                    arrow
                    ariaLabel="pin"
                    title="PIN para acessar a turma"
                  >
                    <TextPIN>{classInstance.pin}</TextPIN>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="editar" title="Editar">
                    <IconButton onClick={handleOpenEditModal(classInstance)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="clonar" title="Clonar Turma">
                    <IconButton onClick={handleOpenCloneModal(classInstance)}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow ariaLabel="deletar" title="Deletar Turma">
                    <IconButton
                      onClick={handleOpenModalDelete(classInstance.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Card>
              ))}
            </AccordionDetails>
          </StyledAccordion>
        )}
      </Container>

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

      <Modal
        open={modalClone.status}
        modalTitle="Realizar clone da Turma"
        modalDescription="Preencha os dados do clone de sua turma..."
        style={{ overflow: 'scroll' }}
        handleClose={handleCloseCloneModal}
      >
        <CloneCLass
          classObj={modalClone.classData}
          handleClose={handleCloseCloneModal}
        />
      </Modal>

      <Modal open={modalDelete.open} handleClose={handleCloseModalDelete}>
        <ConfirmRemove
          handleClose={handleCloseModalDelete}
          onClick={handleRemoveClass}
          title="Deseja mesmo excluir a Turma?"
          description="Todos os dados referente turma serão excluídas."
          width="25vw"
        />
      </Modal>
    </>
  );
};

export default MyClasses;
