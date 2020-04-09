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

    }

    console.time("concat");
    const response = vocabulary.scrambles();
    console.timeEnd("concat");

    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(response));
});

// app.get('/duplicates', (req, res) => {
//     res.set('Content-Type', 'application/json')
//     res.send(JSON.stringify(vocabulary.getDuplicates()));
// });

// app.get('/cleanup', (req, res) => {
//     res.set('Content-Type', 'application/json')
//     res.send(JSON.stringify(vocabulary.getCleanedUpSet()));
// });

console.log("loading vocabulary...");
const vocabulary = vocabular();
console.log("vocabulary loaded");

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))