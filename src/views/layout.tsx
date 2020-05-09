import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../lib/theme';
import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { MenuLayout } from './components/MenuLayout/MenuLayout';

interface Props { }
export function Layout(props: Props) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
        <MenuLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}