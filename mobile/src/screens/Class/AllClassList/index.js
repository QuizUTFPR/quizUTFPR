import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import theme from '@theme';

import api from '@api';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';
import NoContent from '@components/NoContent';

// HOOKS
import useClass from '@hook/useClass';

// STYLES
import { StyledScrollView, ClassContainer } from './style';

const ClassPage = () => {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { handleSetClassData } = useClass();

  const getClasses = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/class/availableClasses');

      setClassList(data.length ? data : []);
    } catch (error) {
      console.log('allclasslist', { ...error });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClasses();
      return () => {
        setLoading(true);
        setClassList([]);
      };
    }, [])
  );

  return (
    <Container>
      {!loading && classList.length === 0 && (
        <NoContent
          title="Opps..."
          subtitle="Ainda não encontramos turmas públicas."
        />
      )}
      <StyledScrollView>
        <ClassContainer>
          {classList.map((item) => (
            <CardWithTeacherName
              key={item.id}
              data={{
                ...item,
                image: {
                  url: item?.imageClass?.url,
                },
              }}
              navigate={() => {
                handleSetClassData({
                  id: item.id,
                  teacher: item.teacher,
                  title: item.title,
                  image: item?.imageClass?.url,
                  description: item.description,
                  pin: item.pin,
                  amountOfQuizzes: item.amountOfQuizzes,
                  subscribed: false,
                });

                navigation.navigate('ClassStack', {
                  screen: 'InfoOfClass',
                });
              }}
              color={theme.color.purple}
            />
          ))}
        </ClassContainer>
      </StyledScrollView>
    </Container>
  );
};
export default ClassPage;
