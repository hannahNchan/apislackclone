// routes/users.js
const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

// Define a route
router.get('/channels', (req, res) => {
    res.send('this is user route');
});

router.post('/create-channels', async (req, res) => {
    const database = client.db("slackdb");
    const channels = database.collection("active_channels");
    const allChannels = await channels.find();
    res.send('Channels', allChannels);
});

router.get('/get-channels', async (req, res) => {
    const database = client.db("slackdb");
    const channels = database.collection("active_channels");
    const allChannels = await channels.find();
    res.send('Channels', allChannels);
});

// export the router module so that server.js file can use it
module.exports = router;