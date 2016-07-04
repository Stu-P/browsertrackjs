const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrowserSchema = new Schema({
    name: String,
    os: String,
    currentVersion: String,
    lastVersionCheck: String,

    versionCheckEnabled: String,
    sarchCriteria: {
        url: String,
        pageLocator: String,
        versionRegex: String
    }
});

var Browser = mongoose.model('Browser', BrowserSchema);

module.exports = Browser;