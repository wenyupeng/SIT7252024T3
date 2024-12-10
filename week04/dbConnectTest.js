const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('sit725');

    database.listCollections().toArray((err, collections) => {
      if (err) throw err;
      console.log("Collections:");
      collections.forEach((collection) => {
        console.log(collection.name);
      });
    });

    const week04 = database.collection('week04');

    if (week04) {
      // console.log("Collection week04 exists!", week04);
      console.log("Collection week04 exists!");
    } else {
      await database.createCollection('week04', (err, res) => {
        if (err) throw err;
        console.log("Collection created!");
      })
    }

    let result= await week04.findOne({}, (err, res) => {
      console.log("find one document");
      if (err) throw err;
      console.log(res);
      if (res.name === "John") {
        console.log("Found John!", res);
      }
    });

    console.log(result);

    // await week04.insertOne({ name: "John", age: 30 }, (err, res) => {
    //   if (err) throw err;
    //   console.log("1 document inserted");
    // });

    // await week04.findOne({ name: "Peter" }, (err, res) => {
    //   if (err) throw err;
    //   console.log(res);
    //   if (res.name === "Peter") {
    //     console.log("Found Peter!", res);
    //   } else {
    //     console.log("Peter not found!");
    //   }
    // });

    // await week04.insertMany([{ name: "Peter", age: 35 }, { name: "David", age: 25 }], (err, res) => {
    //   if (err) throw err;
    //   console.log("2 documents inserted");
    // });

  } catch (error) {
    // console.log(error.message);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

