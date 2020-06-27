import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import { Layout } from './views/layout';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          token: localStorage.getItem('token'),
          refreshToken: localStorage.getItem('refreshToken'),
        }
      });
      return forward(operation).map((response) => {
        const { response: { headers } } = operation.getContext();
        if (headers.get("token")) {
          const tokens = {
            token: headers.get("token"),
            refreshToken: headers.get("refreshToken"),
          };
          localStorage.setItem('token', tokens.token);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        }
        return response;
      });
    }),
    new HttpLink({
      uri: 'https://qa-app-backend.herokuapp.com/'
    }),
  ]),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Layout />
    </ApolloProvider>
  );
}

export default App;
