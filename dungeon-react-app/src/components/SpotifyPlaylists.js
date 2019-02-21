import React from 'react'
import api from '../util/api'

const SpotifyPlaylists = () => {
	console.log(api.getDndPlaylists());
	return <p>Playlists</p>
}

export default SpotifyPlaylists;