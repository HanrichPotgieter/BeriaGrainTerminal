//===================================================>
// Motor Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'Unknown Status '+status
    }

    //===================================================>
    // No Ptype
    //===================================================>  
    switch(status) {
        case 11:
            response.color = "grey";
            response.status = "Low Number Start Delay";
            callback(response);
            break;
        case 1:
            response.color = "grey";
            response.status = "State Low Number";
            callback(response);
            break;
        case 2:
            response.color = "lightgreen";
            response.status = "Change to High Number";
            callback(response);
            break;
        case 13:
            response.color = "green";
            response.status = "High Number Start Delay";
            callback(response);
            break;
        case 3:
            response.color = "green";
            response.status = "State High Number";
            callback(response);
            break;
        case 4:
            response.color = "lightgreen";
            response.status = "Change to Low Number";
            callback(response);
            break;
        case 15:
            response.color = "cyan";
            response.status = "No Position Start Delay";
            callback(response);
            break;
        case 5:
            response.color = "cyan";
            response.status = "No Position";
            callback(response);
            break;
        case 513:
            response.color = "grey";
            response.status = "Low Number";
            callback(response);
            break;
        case 515:
            response.color = "grey";
            response.status = "High Number";
            callback(response);
            break;
        case 32:
        // StFault
            response.color = "red";
            response.status = "Fault";
            callback(response);
            break;
        default:callback(response);
    }
  }
};