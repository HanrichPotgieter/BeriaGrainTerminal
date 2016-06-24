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
                case 513:
                    response.color = "gray";
                    callback(response);
                    break;
                case 3:
                    response.color = "green";
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