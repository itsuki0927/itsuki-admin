import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/layout/App';
import { client } from './graphql';
import { AdminProvider } from './context';
import './global.less';
import { UIProvider } from './ui';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UIProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </UIProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
