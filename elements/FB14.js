//===================================================>
// FB14 Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'Unknown Status '+status
    }
    
    if(status - 512 > 0)
    {
        status = status - 512;
    }
    else if(status - 256 > 0){
        status = status - 256;
    }
    switch(status) {
        case 1:
        // StFalse
            response.color = "gray";
            response.status = "False";
            callback(response);
            break;
        case 2:
        // StCtoTrue
            response.color = "lightgreen";
            response.status = "Change To True";
            callback(response);
            break;
        case 3:
        // StTrue
            response.color = "green";
            response.status = "True";
            callback(response);
            break;
        case 4:
        // StCtoFalse
            response.color = "lightgreen";
            response.status = "Change To False";
            callback(response);
            break;
        case 32:
        // StFault
            response.color = "red";
            callback(response);
            break;
        default:callback(response);
    }
  }
};