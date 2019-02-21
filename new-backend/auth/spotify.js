const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const models = require('../db/spotify')

const request = require('request')
const build_url = require('build-url')
const extend = require('extend')
const shortid = require('shortid')

// Variables
const spotify_client_id = '6b6ed71200844577baa1bfd8da665766'
const spotify_state = shortid.generate() || 'gerblins'
const spotify_redirect_uri = 'http://localhost:5907/auth/spotify/redirect'

var back_url = '/'

router.get('/', (req, res) => {
	back_url = req.header('Referer') || '/';
	// const full_redirect_url = req.protocol + '://' + req.get('host') + req.originalUrl + '/redirect';
	res.redirect(build_url("https://accounts.spotify.com/authorize", {
		queryParams: {
			client_id: spotify_client_id,
			response_type: 'code',
			redirect_uri: spotify_redirect_uri,
			state: spotify_state
			// scope: "user-private user-email",
			// show_dialog: 'false'
		}
	}))
})

router.get('/redirect', (req, res) => {
	// console.log(`Request! state=${req.query.state} code=${req.query.code}`)
	if (req.query.state !== spotify_state) {
		res.redirect(400, back_url);
	}
	if (req.query.error) {
		res.redirect(401, back_url);
	}

	// const full_redirect_url = req.protocol + '://' + req.get('host') + req.originalUrl + '/redirect';
	const auth_header = 'Basic ' + Buffer.from(spotify_client_id + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')

	const code = req.query.code
	request.post({
		url: 'https://accounts.spotify.com/api/token',
		form: {
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: spotify_redirect_uri
		},
		headers: {
			Authorization: auth_header
		}
	}, (err, response, body) => {
		if (err) {
			res.send(body);
			return
		}
		var session = shortid.generate()
		var token = JSON.parse(body)
		req.app.set(session, token)
		const user = new models.SpotifyUser(extend(token, {session_token: session}))
		user.save().then(() => console.log('Added new SpotifyUser: ' + session));
		res.redirect(build_url(back_url, {
			queryParams: {
				session: session
			}
		}));
	})
})

// WRONG
router.get('/refresh', (req, res) => {
	const backURL = req.header('Referer') || '/';

	if (!req.query.session) {
		res.redirect(401, backURL);
		return
	}
	const session = req.query.session

	const auth_header = 'Basic ' + Buffer.from(spotify_client_id + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')

	var token = req.app.get(session)
	
	if (!token) {
		models.SpotifyUser.findOne({session_token: session}, 'refresh_token', (err, spotify_user) => {
			token = spotify_user
			request.post({
				url: 'https://accounts.spotify.com/api/token',
				form: {
					grant_type: 'refresh_token',
					refresh_token: token.refresh_token
				},
				headers: {
					Authorization: auth_header
				}
			}, (err, response, body) => {
				if (err) {
					res.send(body);
					return
				}
				extend(token, JSON.parse(body))
				req.app.set(session, token)
				const user = new models.SpotifyUser(extend(token, {session_token: session}))
				user.save().then(() => console.log('Updated SpotifyUser: ' + session));
				res.redirect(backURL);
			})
		})
		return
	}

	request.post({
		url: 'https://accounts.spotify.com/api/token',
		form: {
			grant_type: 'refresh_token',
			refresh_token: token.refresh_token
		},
		headers: {
			Authorization: auth_header
		}
	}, (err, response, body) => {
		if (err) {
			res.send(body);
			return
		}
		extend(token, JSON.parse(body))
		req.app.set(session, token)
		const user = new models.SpotifyUser(extend(token, {session_token: session}))
		user.save().then(() => console.log('Updated SpotifyUser: ' + session));
		res.redirect(backURL);
	})
})

module.exports = router