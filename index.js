var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

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

    
    var response = {
      color:'yellow',
      status:'started'
    }
    res.send(response);
});