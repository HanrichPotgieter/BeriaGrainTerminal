//===================================================>
// Motor Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'yellow',
    status:'Unknown Status '+status
    }
    //console.log(status);
    switch(parseInt(data.ptype))
    { 
        //===================================================>
        // ptype 7231
        //===================================================>  
        case 7231:
            switch(status-512) {
                case 1:
                    response.color = "gray";
                    response.status = "Minimum";
                    callback(response);
                    break;
                case 3:
                    response.color = "lightgreen";
                    
                    response.status = "Normal Pressure";
                    callback(response);
                    break;
                case 4:
                    response.color = "green";
                    response.status = "High Pressure";
                    callback(response);
                    break;
                case 5:
                    response.color = "red";
                    response.status = "Over Pressure";
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