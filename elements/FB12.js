//===================================================>
// Motor Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'Unknown Status'
    }

    switch(parseInt(data.ptype))
    { 
        //===================================================>
        // ptype 7056
        //===================================================>  
        case 7056:
            switch(status) {
                case 1:
                // StStopped
                    response.color = "gray";
                    response.status = "Stopped";
                    callback(response);
                    break;
                case 2:
                // StStarting
                    response.color = "lightgreen";
                    response.status = "Starting";
                    callback(response);
                    break;
                case 3:
                // StStartedFwd
                    response.color = "green";
                    response.status = "Started Forward";
                    callback(response);
                    break;
                case 5:
                // StStartedRev
                    response.color = "green";
                    response.status = "Started Reverse";
                    callback(response);
                    break;
                case 7:
                // StStopping
                    response.color = "cyan";
                    response.status = "Stopping";
                    callback(response);
                    break;
                case 9:
                // StStartRequest
                    response.color = "gray";
                    response.status = "Start Request";
                    callback(response);
                    break;
                case 513:
                // StStopped
                    response.color = "gray";
                    response.status = "Stopped";
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
        break;
        //<===================================================
        //===================================================>
        // ptype 7053
        //===================================================>  
        case 7053:
            switch(status) {
                case 1:
                // StStopped
                    response.color = "gray";
                    response.status = "Stopped";
                    callback(response);
                    break;
                case 2:
                // StStarting
                    response.color = "lightgreen";
                    response.status = "Starting";
                    callback(response);
                    break;
                case 3:
                // StStartedFwd
                    response.color = "lightgreen";
                    response.status = "Started Forward";
                    callback(response);
                    break;
                case 5:
                // StStartedRev
                    response.color = "green";
                    response.status = "Started Reverse";
                    callback(response);
                    break;
                case 7:
                // StStopping
                    response.color = "cyan";
                    response.status = "Stopping";
                    callback(response);
                    break;
                case 9:
                // StStartRequest
                    response.color = "gray";
                    response.status = "Start Request";
                    callback(response);
                    break;
                case 513:
                // StStopped
                    response.color = "gray";
                    response.status = "Stopped";
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
        break;
        //<===================================================
        default:callback(response);
    }
  }
};