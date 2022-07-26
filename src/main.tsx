import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/layout/App';
import { client } from './graphql';
import { AdminProvider } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AdminProvider>
          <App />
        </AdminProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
