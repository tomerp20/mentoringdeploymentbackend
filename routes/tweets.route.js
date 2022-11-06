/*
    1) GET /tweets
    2) GET /tweets/:id
    3) POST /tweets { name: 'new tweet' }
    4) PUT /tweets/:id { name: 'new tweet' }
    5) DELETE /tweets/:id
*/

const express = require('express');
const route = express.Router();
const { tweetsSchema } = require('../dto/tweets.schema');
const { validateDto } = require('../dto/validate');
const { ErrPermissions } = require('../lib/ResponseHandler');

const { getTweets, getTweet, addTweet, updateTweet, deleteTweet } = require('../repo/tweets.repo');

//  GET /tweets/total-count
route.get('/total-count', async (req, res, next) => { //get a count of total tweets 
    const { user } = req;


    if (!user.permissions.marketing) {
        return next(ErrPermissions());
    }

    const length = (await getTweets()).length;

    console.log('length', length);


    return res.ok(length);
    //return the total only if user has 'marketing' permission
})

//  GET /tweets
route.get('/', async (req, res) => {

    const resp = await getTweets();

    res.ok(resp);
})

//  GET /tweeets/:id
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tweet = await getTweet(id);
    res.ok(tweet);
})

//  POST /tweets { name: 'new tweet' }
route.post('/', validateDto(tweetsSchema), async (req, res) => {
    const json = req.body;

    const insertedId = await addTweet(json);

    res.ok({ ...json, _id: insertedId });
})

//   PUT /tweets/:id { name: 'new tweet' }
route.put('/:id', validateDto(tweetsSchema), async (req, res) => {
    const { id } = req.params;
    const json = req.body;

    const expendedJson = { ...json, another: 'another' };

    const resp = await updateTweet(id, expendedJson);

    res.ok(resp);
})

//  DELETE /tweets/:id 
route.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const resp = await deleteTweet(id);

    res.ok(resp);
})


module.exports = route;