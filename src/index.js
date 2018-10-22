/* eslint react/jsx-filename-extension: 0 */

/* Import necessary plugins */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import './index.css';
import MyApp from './App';
import * as serviceWorker from './serviceWorker';

// Initialize the client, so eslint wont show error
let client = null;

/* Create error link */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

/* Create upload link */
const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

client = new ApolloClient({
  link: ApolloLink.from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
});

/* Apply ApolloProvider and Muitheme to the app */
ReactDOM.render(
  <ApolloProvider client={client}>
    <MyApp />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
