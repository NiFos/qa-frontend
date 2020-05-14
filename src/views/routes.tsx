import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main } from './main-page/Main';
import { LoginPage } from './login-page/LoginPage';
import { Category } from './category-page/Category';
import { Post } from './post-page/Post';

interface Props { }
export function Routes(props: Props) {


  return (
    <Switch>
      <Route path='/login' >
        <LoginPage />
      </Route>
      <Route path='/post/:id' >
        <Post />
      </Route>
      <Route path='/category/:id' >
        <Category />
      </Route>
      <Route path='/user/:id' >
        <LoginPage />
      </Route>
      <Route path='/' exact>
        <Main />
      </Route>
    </Switch>
  );
}