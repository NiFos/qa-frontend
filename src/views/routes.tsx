import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PcPage } from './pc-page/PcPage';
import { Main } from './main-page/Main';

interface Props { }
export function Routes(props: Props) {

  const checkWidth = () => window.screen.width <= 720;

  return (
    <Switch>
      <Route path='/'>
        {
          checkWidth()
            ? <Main />
            : <PcPage />
        }
      </Route>
    </Switch>
  );
}