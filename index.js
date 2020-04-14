const express = require('express');
const vocabular = require("./vocabular");
const app = express()
const port = 3000

app.use(express.json());

app.get('/check/:word', (req, res) => {
    res.send(req.params);
});

app.post("/scrambles", (req, res) => {
    if (req.body && req.body.words) {
        console.time("concat");
        const response = vocabulary.scrambles(req.body.words);
        console.timeEnd("concat");
    
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(response));
    } else {
        res.status(400);
        res.send("Bad request");
    }
});

app.post("/extended-anagrams/", (req, res) => {
    if (req.body && req.body.words) {
        const response = vocabulary.scrambles(req.body.words);
    
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(response));
    } else {
        res.status(400);
        res.send("Bad request");
    }
});

// app.get('/duplicates', (req, res) => {
//     res.set('Content-Type', 'application/json')
//     res.send(JSON.stringify(vocabulary.getDuplicates()));
// });

// app.get('/cleanup', (req, res) => {
//     res.set('Content-Type', 'application/json')
//     res.send(JSON.stringify(vocabulary.getCleanedUpSet()));
// });

app.get('/stats', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(vocabulary.getStatistics()));
});

console.log("loading vocabulary...");
const vocabulary = vocabular();
console.log("vocabulary loaded");

vocabulary.getExtendedAnagrams(["гьон", "дюля"]);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))