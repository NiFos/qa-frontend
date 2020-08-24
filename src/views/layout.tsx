import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../lib/theme';
import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';
import { useQuery } from '@apollo/react-hooks';
import { userQueries } from '../graphql/queries/user.query';
import { Loading } from './components/Loading/Loading';

interface Props { }
export function Layout(props: Props) {

  const meData = useQuery(userQueries.ME);
  const checkWidth = () => window.screen.width <= 720;
  const Content = () => (
    <div>
      < Routes />
      <Menu />
    </div>
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {
          checkWidth()
            ? meData.loading
              ? <Loading />
              : meData.error
                ? 'Something went wrong!'
                : <Content />
            : <div style={{margin: '0 auto', width: '40%'}}>
              <Content  />
            </div>
        }
      </BrowserRouter>
    </ThemeProvider>
  );
}