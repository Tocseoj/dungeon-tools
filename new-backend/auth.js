const express = require('express')
const router = express.Router()

const spotify = require('./auth/spotify')

router.use('/spotify', spotify)

module.exports = router