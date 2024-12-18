const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<EMAIL>/myFirstDatabase?retryWrites=true&w=majority";
const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/sit725?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
client.connect(err => {
    const collection = client.db("sit725").collection("week04");
    // perform actions on the collection object
    client.close();
    console.log("Database connection closed");
});

module.exports = client;