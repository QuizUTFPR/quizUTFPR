import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Assets
// import { FontAwesome } from '@expo/vector-icons';

// Theme
// import theme from '@theme';

// Hooks
import useClass from '@hook/useClass';

// Api
import api from '@api';

// Component
import Dialog from '@components/Dialog';

// Style
import { InputWrapper, SearchInput } from './style';

const FindClassByPin = ({ hideDialog, visible }) => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const { handleSetClassData } = useClass();

  const getClassByPIN = async () => {
    try {
      const { data } = await api.get(`/class/getByPIN/${pin}`);

      setPin('');
      hideDialog();

      handleSetClassData({
        id: data.id,
        acher: data.teacher,
        title: data.title,
        age: data?.image?.url,
        description: data.description,
        n: data.pin,
        amountOfQuizzes: data.amountOfQuizzes,
        bscribed: data.subscribed,
        imageURL: data?.imageClass?.url,
      });

      navigation.navigate('ClassStack', {
        screen: 'InfoOfClass',
        params: {
          id: data.id,
          teacher: data.teacher,
          title: data.title,
          image: data?.image?.url,
          description: data.description,
          pin: data.pin,
          amountOfQuizzes: data.amountOfQuizzes,
          subscribed: data.subscribed,
          imageURL: data?.imageClass?.url,
        },
      });
    } catch (err) {
      console.log('findclassbypin', { ...err });
    }
  };

  return (
    <Dialog
      visible={visible}
      hideDialog={hideDialog}
      title="DIGITE O PIN DE SUA TURMA!!"
      firstButtonOnPress={getClassByPIN}
      secondButtonOnPress={hideDialog}
      firstButtonLabel="PESQUISAR"
      secondButtonLabel="FECHAR"
      childrenNode={
        <InputWrapper>
          <SearchInput
            defaultValue={pin}
            onSubmitEditing={getClassByPIN}
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
