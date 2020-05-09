import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, NormalizedCacheObject, InMemoryCache, HttpLink } from 'apollo-boost'
import { Layout } from './views/layout';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
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
