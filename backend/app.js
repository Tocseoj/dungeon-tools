
// Setup environment
require('dotenv').config()

// Connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

// Setup Express
const express = require('express')
const auth = require('./routes/auth')
const api = require('./routes/api')
const app = express()
const port = 5907

app.get('/', (req, res) => res.send(`<p>Hello World!</p><p><a href="/auth/spotify">Spotify Login</a></p><p></p>`))

app.use('/auth', auth)
app.use('/api', api)

app.listen(port, () => console.log(`App listening on http://localhost:${port}/`))