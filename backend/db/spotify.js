const mongoose = require('mongoose');

var models = {};

models.SpotifyUser = mongoose.model('SpotifyUser', {
	"session_token": String,
	"access_token": String,
  "token_type": String,
  "scope": String,
  "expires_in": Number,
  "refresh_token": String
});

module.exports = models;