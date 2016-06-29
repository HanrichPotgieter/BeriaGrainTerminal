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
        case 12:
            response.color = "lightgreen";
            response.status = "Starting Delay";
            callback(response);
            break;
        case 14:
            response.color = "grey";
            response.status = "Stopped Niveou";
            callback(response);
            break;
        case 13:
            response.color = "grey";
            response.status = "Stopped Weight Dosed";
            callback(response);
            break;
        case 1:
            response.color = "grey";
            response.status = "Stopped";
            callback(response);
            break;
        case 2:
            response.color = "lightgreen";
            response.status = "Starting";
            callback(response);
            break;
        case 11:
            response.color = "lightgreen";
            response.status = "Refill";
            callback(response);
            break;
        case 24:
            response.color = "green";
            response.status = "Dosing Niveou";
            callback(response);
            break;
        case 23:
            response.color = "green";
            response.status = "Dosing Force";
            callback(response);
            break;
        case 3:
            response.color = "green";
            response.status = "Dosing";
            callback(response);
            break;
        case 9:
            response.color = "cyan";
            response.status = "Emptying";
            callback(response);
            break;
        case 10:
            response.color = "cyan";
            response.status = "Emptied";
            callback(response);
            break;
        case 11:
            response.color = "lightgreen";
            response.status = "Refill";
            callback(response);
            break;
        case 32:
            response.color = "red";
            callback(response);
            break;
        default:callback(response);
    }
  }
};