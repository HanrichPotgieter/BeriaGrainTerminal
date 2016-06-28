//===================================================>
// FB14 Function Block
//===================================================>  
module.exports = {
  getStatus: function (data,status,callback) {

    var response = {
    color:'orange',
    status:'Unknown'
    }
    switch(parseInt(data.ptype))
    { 
        //===================================================>
        // ptype 7177
        //===================================================>  
        case 7177:    
            switch(status) {
                case 1:
                // StFalse
                    response.color = "gray";
                    callback(response);
                    break;
                case 2:
                // StCtoTrue
                    response.color = "lightgreen";
                    callback(response);
                    break;
                case 3:
                // StTrue
                    response.color = "green";
                    callback(response);
                    break;
                case 4:
                // StCtoFalse
                    response.color = "lightgreen";
                    callback(response);
                    break;
                case 515:
                // StTrue
                    response.color = "green";
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
        // ptype 7165
        //===================================================>  
        case 7165:   
        console.log(status)
            switch(status) {
                case 256:
                    response.color = "gray";
                    response.status = "False";
                    callback(response);
                    break;
                case 512:
                    response.color = "lightgreen";
                    response.status = "Change To Covered";
                    callback(response);
                    break;
                case 1024:
                    response.color = "green";
                    response.status = "Covered";
                    callback(response);
                    break;
                case 2048:
                    response.color = "lightgreen";
                    response.status = "Change To Uncovered";
                    callback(response);
                    break;
                case 4096:
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