import fs from 'fs';
const typeDefs = [fs.readFileSync('./src/graphql/schema.graphqls', 'utf8')];


export default typeDefs;