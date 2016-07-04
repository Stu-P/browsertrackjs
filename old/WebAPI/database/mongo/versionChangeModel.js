    const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var VersionChangeSchema = new Schema({
        newVersion : String,
        priorVersion : String,
        dateOfChange: Date,
        browserName: String
    });

    var VersionChange = mongoose.model('VersionChange', VersionChangeSchema);

    module.exports =  VersionChange ;