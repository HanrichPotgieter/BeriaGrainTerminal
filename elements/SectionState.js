module.exports = {
  getStatus: function (status,callback) {
    var response = {
    color:'yellow',
    status:'unknown'
    }
    //console.log(status);
    switch(status){
        case 0:
            response.color="white"
            response.status="Passive"
        break;
        case 1:
            response.color="white"
            response.status="Passive"
        break;
        case 2:
            response.color="lightgreen"
            response.status="Waiting"
        break;
        case 4:
            response.color="lightgreen"
            response.status="Active"
        break;
        case 16:
            response.color="cyan"
            response.status="Emptying"
        break;
        case 32:
            response.color="yellow"
            response.status="Emptied"
        break;
        case 64:
            response.color="lightgreen"
            response.status="Idling"
        break;
        default:callback(response);

    }
    callback(response);
  }
};