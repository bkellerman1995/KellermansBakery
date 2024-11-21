const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());


app.get('/handyapi/:bin', async (req, res) => {
    const bin = req.params.bin;
    console.log('parametro'+ bin);
    try {
        const response = await fetch(`https://data.handyapi.com/bin/${bin}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
        console.log('error ', error)
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});