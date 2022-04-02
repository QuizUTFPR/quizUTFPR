import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';
import HeaderHome from '@components/Headers/HeaderHome';
import HeaderClassPage from '@components/Headers/HeaderClassPage';
import HeaderRanking from '@components/Headers/HeaderRanking';

// ICONS
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Image, View } from 'react-native';
import PodiumIcon from '../../../assets/icons/podium.png';

// STACKS
import SearchQuizByTagStack from '../stacks/SearchQuizByTagStack';
import QuizListTopTabStack from '../topTab/QuizListTopTabNavigator';
import ClassListTopTabStack from '../topTab/ClassListTopTabNavigator';
import RankingTopTabStack from '../topTab/RankingTopTabStack';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen
      options={{
        Icon: Ionicons,
        name: 'md-home',
        size: 32,
        header: () => <HeaderHome />,
        tabBarLabel: 'Inicio',
      }}
      name="HomeStack"
      component={QuizListTopTabStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialIcons,
        name: 'category',
        size: 32,
        headerShown: false,
        tabBarLabel: 'Categoria',
      }}
      name="SearchQuizByTagStack"
      component={SearchQuizByTagStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialCommunityIcons,
        name: 'google-classroom',
        size: 32,
        header: () => <HeaderClassPage />,
        tabBarLabel: 'Turmas',
      }}
      name="ClassListTopTabStack"
      component={ClassListTopTabStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialCommunityIcons,
        name: 'google-classroom',
        size: 32,
        tabBarLabel: 'Ranking',
        header: () => <HeaderRanking />,
        // tabBarIcon: () => (
        //   <View>
        //     <Image
        //       source={PodiumIcon}
        //       resizeMode="cover"
        //       style={{
        //         width: 22,
        //         height: 22,
        //       }}
        //     />
        //   </View>
        // ),
      }}
      name="RankingTopTabStack"
      component={RankingTopTabStack}
    />
  </Tab.Navigator>
);

export default TabNavigator;
