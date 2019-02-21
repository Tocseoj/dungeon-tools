import request from 'request';
// import { Cookies } from 'react-cookie';

const api = {
	getDndPlaylists: function() {
		// console.log(Cookies.get('session'));
		request.get('http://localhost:5907/api/spotify/dnd-playlists', (err, response, body) => {
			return body;
		})
	},
} 

export default api;