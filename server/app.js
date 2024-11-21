const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const typesSchema = require('./schema/types_schema');

app.use('/graphql', graphqlHTTP({
        graphiql: true,
        schema: typesSchema
})
);

app.listen(4000, () => {
    console.log('Listening on port 4000');
});