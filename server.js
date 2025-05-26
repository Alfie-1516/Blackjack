require('dotenv').config();

const { Console } = require('console');
const express = require('express');
const shuffledDeck = require('./controller/deck.js');

const path = require('path');
const PORT = process.env.PORT 
const app = express();

if(!PORT) Console.error('PORT environment variable is not set. Please set it in your .env file.');

app.get('/deck', (req, res) => {
    const deck = shuffledDeck();
    res.json(deck);
})


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(404)
    res.send(`<h1>Error 404 -Resource Not Found</h1>`)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});