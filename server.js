const http = require('http');
const express = require('express');
const channels = require('./routers/channels');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is product route');
});


// export the router module so that server.js file can use it
module.exports = router;