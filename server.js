require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const College = require('./models/College');
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
})

app.listen(process.env.PORT || 8000, () => console.log('Server running on port 8000'));
