//===================================================>
// FB14 Function Block
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