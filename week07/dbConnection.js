const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

client.connect;

module.exports = client;