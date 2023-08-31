{/*const PORT = 8000;

const axios = require('axios');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors())

app.get('/languages', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_HOST,
            "X-RapidAPI-Host": process.env.RAPID_API_KEY,
        }
    }

    try {
        const response = await axios('https://deep-translate1.p.rapidapi.com/language/translate/v2/languages', options)
        const dataFrom = response.data.languages;
        res.status(200).json(dataFrom)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err})
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT));*/}
