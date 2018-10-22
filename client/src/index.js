import React from 'react';
import ReactDOM from 'react-dom';


import ApolloClient from 'apollo-client';
// import {HttpLink} from 'apollo-link-http';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


let errorLink = onError((errors) => {
    console.log("errors: ", errors);
});

// let link = new HttpLink({uri: 'http://localhost:3000/graphql'});
let link = new BatchHttpLink({uri: 'http://localhost:3000/graphql'});

let client = new ApolloClient({
    link: errorLink.concat(link),
    cache: new InMemoryCache()
});


ReactDOM.render(<App client={client}/>, document.getElementById('root'));
registerServiceWorker();
