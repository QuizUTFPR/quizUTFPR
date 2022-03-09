import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import theme from '@theme';

import api from '@api';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';

// STYLES
import { StyledScrollView, ClassContainer } from './style';

const ClassPage = () => {
  const [classList, setClassList] = useState([]);
  const navigation = useNavigation();

  const getClasses = async () => {
    try {
      const { data } = await api.get('/class/availableClasses');
      console.log('data', data);
      setClassList(data.length ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClasses();
    }, [])
  );
  return (
    <Container>
      <StyledScrollView>
        <ClassContainer>
          {classList.map((item) => (
            <CardWithTeacherName
              key={item.id}
              data={item}
              navigate={() =>
                navigation.navigate('ClassStack', {
                  screen: 'InfoOfClass',
                  id: item.id,
                  teacher: item.teacher,
                  title: item.title,
                  image: item?.image?.url,
                  description: item.description,
                  pin: item.pin,
                })
              }
              color={theme.color.purple}
            />
          ))}
        </ClassContainer>
      </StyledScrollView>
    </Container>
  );
};
export default ClassPage;
