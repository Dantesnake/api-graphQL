const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./src/graphql/schema');
const schemaReview = require('./src/graphql/schemaReview');
const resolvers = require('./src/graphql/resolvers');
const resolversReview = require('./src/graphql/resolversReview');


require('dotenv').config();


const app = express();
const PORT = 3001;
const MONGODB_URI = process.env.URLDB;

var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

mongoose.connect(MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))




app.use("/login", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true

}));

app.use("/review", graphqlHTTP({
    schema: schemaReview,
    rootValue: resolversReview,
    graphiql: true
}));


app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}.`);
});

