const { ObjectId } = require('mongodb');
const { tweets } = require('../lib/mongo');
const DB = require('../db');
const oldTweets = new DB('tweets');

const isOld = false;

module.exports.getTweets = async () => {
    if (isOld) {
        return oldTweets.get();
    }
    return await tweets().find({}).toArray();
}

module.exports.getTweet = async (id) => {
    if (isOld) {
        return oldTweets.getById(id);
    }
    return await tweets().find({ _id: ObjectId(id) }).toArray();
}

module.exports.addTweet = async (tweet) => {
    const newTweet = await tweets().insertOne(tweet);
    return newTweet.insertedId;
}

module.exports.updateTweet = async (id, tweet) => {
    return await tweets().updateOne({ _id: ObjectId(id) }, { $set: tweet }, { upsert: true });
}

module.exports.deleteTweet = async (id) => {
    return await tweets().deleteOne({ _id: ObjectId(id) });
}