const express = require('express');
const vocabular = require("./vocabular");
const app = express()
const port = 3000

app.use(express.json());

app.get('/check/:word', (req, res) => {
    res.send(req.params);
});

//scrambles
app.post("/scrambles", (req, res) => {
    if (req.body) {
        console.time("getScrambles");
        const response = vocabulary.getScrambles(req.body);
        console.timeEnd("getScrambles");
    
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(response));
    } else {
        res.status(400);
        res.send("Bad request");
    }
});

//extended anagrams
app.post("/extended-anagrams/", (req, res) => {
    if (req.body) {
        const response = vocabulary.getExtendedAnagrams(req.body);
    
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(response));
    } else {
        res.status(400);
        res.send("Bad request");
    }
});

//stats
app.get('/stats', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(vocabulary.getStatistics()));
});

console.log("loading vocabulary...");
const vocabulary = vocabular();
console.log("vocabulary loaded");

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))