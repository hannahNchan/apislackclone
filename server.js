import express from 'express';
import { MongoClient } from "mongodb";
import 'dotenv/config';
import bodyParser from 'body-parser';
import { ObjectId } from "mongodb";

const app = express();
const port = 5000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/channels', (req, res) => {
    res.send('this is user channels');
});

app.post('/create-channels', async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        const channelsdb = client.db("slackdb");
        const collection = channelsdb.collection("active_channels");
        const result = await collection.insertOne(req.body);
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
        res.send('insert channels');
    } finally {
        await client.close();
    }
});

app.delete('/delete-channel/:id', async (req, res) => {
    const { id } = req.params;
    if (id) {
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            const channelsdb = client.db("slackdb");
            const collection = channelsdb.collection("active_channels");
            const o_id = new ObjectId(id);
            const result  = await collection.deleteOne({ _id: o_id });
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
              } else {
                console.log("No documents matched the query. Deleted 0 documents.");
              }
            res.send('Delete one channel');
        } finally {
            await client.close();
        }
    }  else {
        return res.status(400).send({
            message: 'Error: You need to provide an valid Id'
        });
    }
});

app.get('/get-channels/:id?', async (req, res) => {
    const { id } = req.params;
    if (id) {
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            const channelsdb = client.db("slackdb");
            const collection = channelsdb.collection("active_channels");
            const o_id = new ObjectId(id);
            const oneChannels = await collection.findOne(o_id);
            res.status(200).json(oneChannels);
        } finally {
            await client.close();
        }
    }  else {
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            const channelsdb = client.db("slackdb");
            const collection = channelsdb.collection("active_channels");
            const allChannels = await collection.find({}).toArray();
            res.status(200).json(allChannels);
        } finally {
            await client.close();
        }
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})