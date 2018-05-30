import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import schema from './graphql/schema';

import config from './../app-config.json'

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: schema,
    formatError: error => ({
        message: error.message,
        state: error.originalError && error.originalError.state,
    })
}));
if (config.enableGraphiQL)
    app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'})); // if you want GraphiQL enabled



// console.log("Database: ", database);


export default app;

