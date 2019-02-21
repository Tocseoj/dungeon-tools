require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

const express = require('express')
const auth = require('./auth')
const api = require('./api')

const app = express()
const port = 5907

app.get('/', (req, res) => res.send(`<p>Hello World!</p><p><a href="/auth/spotify">Spotify Login</a></p><p></p>`))

app.use('/auth', auth)
app.use('/api', api)

app.listen(port, () => console.log(`App listening on http://localhost:${port}/`))