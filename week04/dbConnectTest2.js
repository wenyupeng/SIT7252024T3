const { MongoClient } = require('mongodb');
 
async function main() {
    const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
    try {
        await client.connect();
 
        console.log("connect server");
 
        const database = client.db('sit725');
 
        const collectionName = 'week04';
 
        const collection = database.collection(collectionName);
 
        // const docs = [
        //     { title: "Week01", description: "learning about HTML, CSS, JavaScript, and Materialize framework.", evaluation: "good" },
        //     { title: "Week02", description: "apply express library to create a server and handle HTTP requests.", evaluation: "good" },
        //     { title: "Week03", description: "combine node.js, express and materialize to create a web application demo.", evaluation: "good" }
        // ];
 
        // const result = await collection.insertMany(docs);
 
        // console.log(`${result.insertedCount} documents created`);
        // Object.keys(result.insertedIds).forEach((id, index) => {
        //     console.log(`documents ${index + 1}: ${id}`);
        // });
 
        const query = {}; 
        const options = { projection: { _id: 0, name: 1, age: 1, address: 1 } };
        const cursor = collection.find(query, options);
 
        const allValues = await cursor.toArray();
        console.log("documents:");
        console.log(allValues);
    } finally {
        await client.close();
    }
}
 
main().catch(console.error);