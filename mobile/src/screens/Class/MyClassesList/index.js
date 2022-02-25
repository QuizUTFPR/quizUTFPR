import React from 'react';
// import theme from '@theme';
import { Text } from 'react-native';

// import { useFocusEffect } from '@react-navigation/native';

// import api from '@api';

// Components
import Container from '@components/Container';
// import CardWithTeacherName from '@components/Card/WithTeacherName';

// STYLES
import { StyledScrollView, ClassContainer } from './style';

const ClassPage = () => (
  // const [classList, setClassList] = useState([]);

  // const getClasses = async () => {
  //   try {
  //     const { data } = await api.get('/class/availableClasses');
  //     setClassList(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     getClasses();
  //   }, [])
  // );

  <Container>
    <StyledScrollView>
      <ClassContainer>
        <Text>teste</Text>
      </ClassContainer>
    </StyledScrollView>
  </Container>
);
export default ClassPage;
