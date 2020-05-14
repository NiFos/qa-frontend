import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PcPage } from './pc-page/PcPage';
import { Main } from './main-page/Main';
import { LoginPage } from './login-page/LoginPage';

interface Props { }
export function Routes(props: Props) {


  return (
    <Switch>
      <Route path='/' exact>
        <Main />
      </Route>
      <Route
        path='/login'
      >
        <LoginPage />
      </Route>
    </Switch>
  );
}