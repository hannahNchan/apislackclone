router.get('/channels', (req, res) => {
    res.send('this is user route');
});

router.post('/create-channels', (req, res) => {
    console.log(req.body)
    res.send('this is user route');
});

// export the router module so that server.js file can use it
module.exports = router;