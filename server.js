import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/channels', (req, res) => {
    res.send('this is user channels');
});

app.post('/create-channels', (req, res) => {
    console.log(req.body)
    res.send('this is user route');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})