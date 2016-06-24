module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'started'
    }

    if(status === 513){
        response.color = "gray";
        callback(response);
    }
    else if(status === 3){
        response.color = "green";
        callback(response);
    }
    else{
        callback(response);
    }

  },
};