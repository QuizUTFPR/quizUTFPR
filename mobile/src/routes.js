import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// PAGES
import Home from './pages/Home';

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP
const Routes = createAppContainer(
  createStackNavigator({
    Home,
  })
);

export default Routes;
