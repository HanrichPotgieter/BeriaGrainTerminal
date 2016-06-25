var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var snap7 = require('node-snap7');
var elementInfo = require('./elements/getStatus');
var s7client = new snap7.S7Client();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('www'));

app.get('/', function (req, res) {
  res.sendfile(__dirname+'/www/index.html');
});



app.listen(3000, function () {
    console.log('====================================');
    console.log('Control System started on port 3000.');
    console.log('Written with love by H.Potgieter');
    console.log('====================================');

    s7client.ConnectTo('10.0.0.70', 0, 2, function(err) {
        if(err)
        console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        else
        console.log('Connection Successful');
    });
    
});

app.post('/getStatus', function(req, res){    
    var element = req.body;
    if(s7client.Connected()){
        s7client.DBRead(parseInt(element.DB),parseInt(element.OFFSET),2,function(err,data){
        if(err){
                res.sendStatus(200);
                return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));
        }
        else
            var status = data.readUIntBE(0, 2);
            elementInfo.getStatus(element,status,function(data){
                res.send(data);
            });
        });
    }
    res.sendStatus(404);
});

app.post('/setBit', function(req, res){ 
    var element = req.body;   
    if(s7client.Connected()){
        s7client.WriteArea(s7client.S7AreaDB,parseInt(element.DB), (parseInt(element.OFFSET)*8+parseInt(element.BIT)), 1, s7client.S7WLBit, new Buffer([0x01]) , function(err) {
            if(err)
                return console.log(' >> WriteArea failed. Code #' + err + ' - ' + s7client.ErrorText(err));
            else
            res.sendStatus(200);
        });
    }
    res.sendStatus(404);
});
