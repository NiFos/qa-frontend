import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../lib/theme';
import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';
import { PcPage } from './pc-page/PcPage';
import { useQuery } from '@apollo/react-hooks';
import { userQueries } from '../graphql/queries/user.query';
import { Loading } from './components/Loading/Loading';

interface Props { }
export function Layout(props: Props) {

  const meData = useQuery(userQueries.ME);
  const checkWidth = () => window.screen.width <= 720;
  const Content = () => (
    <>
      < Routes />
      <Menu />
    </>
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {
          checkWidth()
            ? meData.loading
              ? <Loading />
              : meData.error
                ? 'Something wrong!'
                : <Content />
            : <PcPage />
        }
      </BrowserRouter>
    </ThemeProvider>
  );
}