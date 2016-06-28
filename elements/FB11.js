//===================================================>
// Motor Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'Unknown Status '+status
    }

    switch(parseInt(data.ptype))
    { 
        //===================================================>
        // ptype 7002
        //===================================================>  
        case 7002:
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
                    response.status = "Started";
                    callback(response);
                    break;
                case 5:
                // StStartedRev
                    response.color = "grey";
                    response.status = "False";
                    callback(response);
                    break;
                case 32:
                // StStopping
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