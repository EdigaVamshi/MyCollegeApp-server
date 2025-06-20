require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const College = require('./models/College');
const BugReport=require('./models/BugReport')
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));
db.once('open', () => console.log("Connected to Database"));

app.post('/submit-colleges', async (req, res) => {
    try {
        const colleges = req.body;

        if (!Array.isArray(colleges)) {
            return res.status(400).json({ error: "Expected an array of college entries" });
        }
        await College.insertMany(colleges);
        res.status(200).json({ message: "Colleges saved successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save colleges" });
    }
});

app.get('/api/colleges-info', async (req, res) => {
    try {
        const colleges = await College.find({});
        res.status(200).json(colleges);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to retrieve colleges-info" });
    }
});
<<<<<<< HEAD

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.post('/submit-bug', async (req, res) => {
    try{
        const {message}=req.body;

        if(!message || typeof message !== 'string'){
            return res.status(400).json({error: 'Message is required'});
        }

        const newReport=new BugReport({message});
        await newReport.save();
        res.status(200).json({message: 'Bug report submitted !'});
    } catch (err){
        res.status(500).json({error: 'Failed to submit bug report'})
    }
})
=======
>>>>>>> 9ddd8c8c20a4cf2ce878daaa40ddf63927fd8eaf

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
