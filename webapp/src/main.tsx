import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { router } from './router';

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
