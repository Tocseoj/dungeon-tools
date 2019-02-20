require('dotenv').config()
const express = require('express')
const request = require('request')
const helper = require('./helpers.js')
const build_url = require('build-url');
const app = express()
const port = 5907

const spotify_client_id = '6b6ed71200844577baa1bfd8da665766'
const spotify_state = 'gerblins'

app.get('/', (req, res) => res.send('Hello World!<p><a href="/auth/spotify">Spotify Login</a></p>'))

app.get('/auth/spotify', (req, res) => {
	var full_redirect_url = req.protocol + '://' + req.get('host') + req.originalUrl + '/redirect';
	// res.redirect(helper.url_query_add({
	// 	url: "https://accounts.spotify.com/authorize",
	// 	query: {
	// 		client_id: spotify_client_id,
	// 		response_type: 'code',
	// 		redirect_uri: full_redirect_url,
	// 		state: spotify_state,
	// 		// scope: "user-private%20user-email",
	// 		show_dialog: 'true'
	// 	}
	// }))
	res.redirect(build_url("https://accounts.spotify.com/authorize", {
		queryParams: {
			client_id: spotify_client_id,
			response_type: 'code',
			redirect_uri: full_redirect_url,
			state: spotify_state,
			// scope: "user-private%20user-email",
			show_dialog: 'true'
		}
	}))
})

app.get('/auth/spotify/redirect', (req, res) => {
	console.log(`Request! state=${req.query.state} code=${req.query.code}`)
	res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}/`))