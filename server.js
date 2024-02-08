const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
    });