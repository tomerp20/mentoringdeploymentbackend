const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_CONNECTION_STRING

let itc = {};

MongoClient.connect(uri, { useUnifiedTopology: true }).then((client, err) => {
    if (err) {
        console.log('Unable to connect to MongoDB');
        return;
    }

    console.log('Mongo DB is connected');

    itc = client.db('itc');
});

module.exports = { 
    tweets : () => {
        return itc.collection('tweets');
    }
 };

// const getAllTweets = async (client) => {
    
//     const tweets = db.collection('tweets');

//     const resp = await tweets.find({}).toArray();

//     console.log('All Tweets =>', resp);
// }