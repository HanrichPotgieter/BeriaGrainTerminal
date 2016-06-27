module.exports = {
  getStatus: function (data,status,callback) { 
    try {
        var FB = require('./' + data.type);
        FB.getStatus(data,status,callback);
    }
    catch(err) {
        console.log(err);
        console.log('Could not find fnction block file.');
    }
  },
  getSectionStatus:function(status,callback) {
    var section = require('./SectionState.js');
    section.getStatus(status,callback);
  }
};