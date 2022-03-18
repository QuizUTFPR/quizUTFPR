import React, { useState } from 'react';

// Assets
// import { FontAwesome } from '@expo/vector-icons';

// Theme
// import theme from '@theme';

// Api
// import api from '@api';

// Component
import Dialog from '@components/Dialog';

// Style
import { InputWrapper, SearchInput } from './style';

const FindClassByPin = ({ hideDialog, visible }) => {
  const [pin, setPin] = useState();

  const getClassByPin = async () => {
    try {
      console.log('clicou');
      // const { data } = await api.post('/quiz/getByPIN', { pin });
      // navigation.navigate('Descricao', {
      //   idStudentQuiz: data.idStudentQuiz,
      //   questionAmount: data.questionAmount,
      //   studentChoicesAmount: data.studentChoicesAmount,
      //   quiz: {
      //     id: data?.quiz?.id,
      //     title: data?.quiz?.title,
      //     description: data?.quiz?.description,
      //     pin: data?.quiz?.pin,
      //     image: data.quiz?.image?.url,
      //     tags: data?.quiz?.tagsQuiz.map((tag) => tag.name),
      //   },
      // });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      visible={visible}
      hideDialog={hideDialog}
      title="DIGITE O PIN DE SUA TURMA!!"
      firstButtonOnPress={getClassByPin}
      secondButtonOnPress={hideDialog}
      firstButtonLabel="PESQUISAR"
      secondButtonLabel="FECHAR"
      childrenNode={
        <InputWrapper>
          <SearchInput
            defaultValue={pin}
            onSubmitEditing={getClassByPin}
            onChangeText={(pinText) => setPin(pinText)}
            placeholder="Digite o PIN da Turma"
          />
        </InputWrapper>
      }
    />
  );
};

FindClassByPin.defaultProps = {
  hideDialog: () => {},
  visible: false,
};

export default FindClassByPin;
