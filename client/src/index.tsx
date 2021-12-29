import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

// if (process.env.NODE_ENV === 'development') {
const { worker } = require('./mocks/browser');
worker.start();
// }

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
