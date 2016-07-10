/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema definitions.
 */

mongoose.model('OAuthTokens', new Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client: { type: String },
 //   clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
  user: { type: String }
//    userId: { type: String }
}));

mongoose.model('OAuthClients', new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array },
  grants: {type : Array}
}));

mongoose.model('OAuthUsers', new Schema({
  email: { type: String },
  password: { type: String },
  username: { type: String ,unique : true, required : true, dropDups: true }
}));

var OAuthTokensModel = mongoose.model('OAuthTokens');
var OAuthClientsModel = mongoose.model('OAuthClients');
var OAuthUsersModel = mongoose.model('OAuthUsers');

module.exports = OAuthUsersModel;

/**
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

 return OAuthTokensModel.findOne({ accessToken: bearerToken });
};

/**
 * Get client.
 */

module.exports.getClient = function(_clientId, _clientSecret) {
  console.log('in getClient (clientId: ' + _clientId + ', clientSecret: ' + _clientSecret + ')');

  return OAuthClientsModel.findOne({ clientId: _clientId, clientSecret: _clientSecret });

};

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = function(_refreshToken) {
  console.log('in getRefreshToken (refreshToken: ' + _refreshToken + ')');

  return OAuthTokensModel.findOne({ refreshToken: _refreshToken });
};

/*
 * Get user.
 */

module.exports.getUser = function(_username, _password) {
  console.log('in getUser (username: ' + _username + ', password: ' + _password + ')');

  return OAuthUsersModel.findOne({ username: _username, password: _password });
};

/**
 * Save token.
 */

module.exports.saveToken = function(_token, _client, _user) {
  console.log('in saveToken (token: ' + _token + ')');

  var accessToken = new OAuthTokensModel({
    accessToken: _token.accessToken,
    accessTokenExpiresOn: _token.accessTokenExpiresOn,
//    clientId: _client.id,
    client: _client.id,
    refreshToken: _token.refreshToken,
    refreshTokenExpiresOn: _token.refreshTokenExpiresOn,
  //  userId: _user.id
    user: _user.id
  });

 return accessToken.save();

};