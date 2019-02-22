const express = require('express')
const router = express.Router()
const request = require('request')

const mongoose = require('mongoose');
const models = require('../db/spotify.js');

router.get('/', (req, res) => {
	console.log('GET /api/spotify')
})

router.get('/dnd-playlists', (req, res) => {
	console.log('GET /api/spotify/dnd-playlists')
	const session = req.query.session
	if (!session) {
		res.sendStatus(401)
	}
	res.sendStatus(404)
	var token = req.app.get(session)
	if (token) {
		request.get({
			url: 'https://api.spotify.com/v1/users/bezoing/playlists',
			qs: {
				limit: 10
			},
			headers: {
				Authorization: 'Bearer ' + token.access_token
			}
		}, (err, response, body) => {
			if (err) {
				res.send(err)
			}
			res.send(body)
		})
	}
	else {
		// res.sendStatus(400);
		models.SpotifyUser.findOne({session_token: session}, 'access_token', function(err, access) {
			if (err) {
				res.send(err)
			}
			console.log(access.access_token)
			request.get({
				url: 'https://api.spotify.com/v1/users/bezoing/playlists',
				qs: {
					limit: 10
				},
				headers: {
					Authorization: 'Bearer ' + access.access_token
				}
			}, (err, response, body) => {
				if (err) {
					res.send(err)
				}
				res.send(body)
			})
		})
	}
})

module.exports = router