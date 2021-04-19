import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';



// ROUTES
import {
  HOME
} from '@routes';

// COMPONENTS
const Menu = lazy(() => import('../../components/MenuDrawer'));

const Main = () => {

  return (
    <>
      <Suspense fallback={<p>Carregando...</p>}>
        <Menu />
        <Switch>
          {/* <Route path={HOME} component={Index} exact /> */}
        </Switch>
      </Suspense>
    </>
  );
};

export default Main;
