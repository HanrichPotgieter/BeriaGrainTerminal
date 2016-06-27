module.exports = {
  getStatus: function (status,callback) {
    var response = {
    color:'yellow',
    status:'unknown'
    }
    switch(status){
        case 0:
            response.color="lightgreen"
            response.status="No Faults"
        break;
        case 1:
            response.color="red"
            response.status="Bin Empty"
        break;
        case 2:
            response.color="red"
            response.status="Bin Full"
        break;
        case 4:
            response.color="red"
            response.status="Way Confict"
        break;
        case 8:
            response.color="red"
            response.status="Warning"
        break;
        case 16:
            response.color="red"
            response.status="Mechanical Fault"
        break;
        case 32:
            response.color="red"
            response.status="Dosing Fault"
        break;
        case 64:
            response.color="red"
            response.status="Job Request Error"
        break;
        case 128:
            response.color="red"
            response.status="Error 31"
        break;
        default:callback(response);

    }
    callback(response);
  }
};