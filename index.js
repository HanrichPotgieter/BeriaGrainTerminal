var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var snap7 = require('node-snap7');

var s7client = new snap7.S7Client();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('www'));

app.get('/', function (req, res) {
  res.sendfile(__dirname+'/www/index.html');
});

app.listen(3000, function () {
  console.log('Control System started on port 3000.');
});

app.post('/getStatus', function(req, res){    
    //console.log(req.body); 
    var element = req.body;
    console.log(element);

    var response = {
      color:'yellow',
      status:'started'
    }
    
    s7client.DBRead(parseInt(element.DB),parseInt(element.OFFSET),2,function(err,data){
      if(err)
            return console.log(' >> ABRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
      else
        var status = data.readUIntBE(0, 2);
        if(status === 513){
            response.color = "gray";
            res.send(response);
        }
        else if(status === 3){
            response.color = "green";
            res.send(response);
        }
        else{
            res.send(response);
        }
    })

});

s7client.ConnectTo('10.0.0.70', 0, 2, function(err) {
    if(err)
        return console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
    else
      console.log('Connection Successful');
});