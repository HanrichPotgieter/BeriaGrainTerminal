//===================================================>
// Motor Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'started'
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
                    callback(response);
                    break;
                case 2:
                // StStarting
                    response.color = "lightgreen";
                    callback(response);
                    break;
                case 3:
                // StStartedFwd
                    response.color = "green";
                    callback(response);
                    break;
                case 5:
                // StStartedRev
                    response.color = "green";
                    callback(response);
                    break;
                case 7:
                // StStopping
                    response.color = "cyan";
                    callback(response);
                    break;
                case 9:
                // StStartRequest
                    response.color = "gray";
                    callback(response);
                    break;
                case 513:
                // StStopped
                    response.color = "gray";
                    callback(response);
                    break;
                case 32:
                // StFault
                    response.color = "red";
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
                    callback(response);
                    break;
                case 2:
                // StStarting
                    response.color = "lightgreen";
                    callback(response);
                    break;
                case 3:
                // StStartedFwd
                    response.color = "green";
                    callback(response);
                    break;
                case 5:
                // StStartedRev
                    response.color = "green";
                    callback(response);
                    break;
                case 7:
                // StStopping
                    response.color = "cyan";
                    callback(response);
                    break;
                case 9:
                // StStartRequest
                    response.color = "gray";
                    callback(response);
                    break;
                case 513:
                // StStopped
                    response.color = "gray";
                    callback(response);
                    break;
                case 32:
                // StFault
                    response.color = "red";
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