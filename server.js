var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var snap7 = require('node-snap7');
var elementInfo = require('./elements/getStatus');
var s7client = new snap7.S7Client();
var ping = require('ping');
var bufferrReverse = require("buffer-reverse");
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('www'));

app.get('/', function (req, res) {
  res.sendfile(__dirname+'/www/index.html');
});

var ip = '10.0.0.70';
var connected = false;

var connectToPlc = function(){
    console.log("Starting connection...");
    s7client.ConnectTo(ip, 0, 2, function(err) {
        if(err){
            console.log(' >> Connection failed. Code #' + err + ' - ' + s7client.ErrorText(err));
            setTimeout(connectToPlc, 1000);
        }
        else{
            console.log('Connection Successful');
            connected = true;
            checkConnection();
        }
    });
}

connectToPlc();

var checkConnection = function(){
    var hosts = [ip];

    hosts.forEach(function (host) {
        ping.promise.probe(host)
            .then(function (res) {
                if(res.alive)
                {
                     setTimeout(checkConnection, 5000);
                }
                else
                {
                    connected = false;
                    console.log("PLC Connection Failed");
                    connectToPlc();                    
                }
            });
    });
}

server.listen(3000);

app.post('/getStatus', function(req, res){    
    var element = req.body;
    //console.log(element);
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
    else{
        res.send({color:'orange',status:'PLC Disconnected'});
    }
});

app.post('/getIoState', function(req, res){  
    var element = req.body;
    var status = {
        color:'orange',
        id:element.id,
        description:"PLC Disconnected"
    }

    var containsFlag = function(number, flag) {
        return (number & flag) === flag;
    };

    if(s7client.Connected() && connected){
        if(element.type === "Q")
        {
            //console.log(element);
            s7client.ABRead(parseInt(element.pos),parseInt(element.offset)+1,function(err,data){
                if(err){
                    res.sendStatus(200);
                    return console.log(' >> IO failed. Code #' + err + ' - ' + s7client.ErrorText(err));
                }
                else{
                    //console.log(data[0]);
                    if(containsFlag(data[0],Math.pow(2,(parseInt(element.offset))))){
                        status.color="green";
                        status.description="ON"
                        res.send(status);
                    }
                    else{
                        status.color="red";
                        status.description="OFF"
                        res.send(status);
                    }
                }

            });
        }
        if(element.type === "I")
        {
            s7client.EBRead(parseInt(element.pos),parseInt(element.offset)+1,function(err,data){
                if(err){
                    return console.log(' >> IO failed. Code #' + err + ' - ' + s7client.ErrorText(err));
                }
                else{
                  
                    

                    //console.log(data[0]);
                    //console.log(Math.pow(2,(parseInt(element.offset)+1)));

                    if(containsFlag(data[0],Math.pow(2,(parseInt(element.offset))))){
                        //console.log("true status");
                        status.color="green";
                        status.description="ON"
                        res.send(status);
                    }
                    else{
                        //console.log("fasle status");
                        status.color="red";
                        status.description="OFF"
                        res.send(status);
                    }
                }

            });
        }

    }else{
        res.send(status);
    }
});

app.post('/setBit', function(req, res){ 
    var element = req.body;   
    if(s7client.Connected() && connected){
        s7client.WriteArea(s7client.S7AreaDB,parseInt(element.DB), (parseInt(element.OFFSET)*8+parseInt(element.BIT)), 1, s7client.S7WLBit, new Buffer([0x01]) , function(err) {
            if(err)
                return console.log(' >> WriteArea failed. Code #' + err + ' - ' + s7client.ErrorText(err));
            else
            res.sendStatus(200);
        });
    }else{
        res.sendStatus(404);
    }
    
});

app.post('/getSectionStatus', function(req, res){ 
    var element = req.body;   

    var getSectionFaults = function(res,data){
        var sectionData = data;
        s7client.DBRead(parseInt(element.DB),parseInt(104),2,function(err,data){
        if(err){
                return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));    
        }
        else
            var status = data.readUIntBE(1, 1);
            elementInfo.getSectionFault(status,function(data){
                sectionData.fault = data;
                res.send(sectionData);
            });
             
        });
       
    }
    if(s7client.Connected() && connected){
        s7client.DBRead(parseInt(element.DB),parseInt(100),2,function(err,data){
        if(err){
                res.sendStatus(200);
                return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));    
        }
        else
            var status = data.readUIntBE(0, 2);
            elementInfo.getSectionStatus(status,function(data){
                data.id = element.id;
                getSectionFaults(res,data);
            });
         
        });    
    }
    else{
        res.send({color:'orange',status:'PLC Disconnected',id:element.id});      
    }
});

app.post('/writeBin', function(req, res){   
    var element = req.body;
    var buffer = new Buffer(2);
    buffer.writeUInt16BE(element.number, 0);
    
    console.log(parseInt(element.DB),parseInt(element.OFFSET),2,buffer,element.number);
    s7client.DBWrite(parseInt(element.DB),parseInt(element.OFFSET),2,buffer,function(err,data){
        if(err){
            res.sendStatus(200);
            return console.log(' >> DBRead Write. Code #' + err + ' - ' + s7client.ErrorText(err));    
        }
        else{
            res.sendStatus(200);
        }
    }); 
});

app.post('/getValue', function(req, res){   
    var element = req.body;  
    if(s7client.Connected() && connected){
        s7client.DBRead(parseInt(element.DB),parseInt(element.OFFSET),4,function(err,data){
        if(err){
                res.sendStatus(404);
                return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));    
        }
        else
            var status = data.readUIntBE(0, 4);
            var data = {
                value:status,
                id:element.id
            };
            res.send(data);
        });    
    }
    else{
        res.sendStatus(404);    
    }
});
// This needs to go into a seprate module
io.on('connection', function(socket){
    var elements = [];
    var updateElements = function(){
        console.log('Updating elements');
        var dataToSend = {
            status:{color:'orange',status:'PLC Disconnected'}
        };

        var sendData = function(elementsData){
            // Only Copy the necessary data before sending.
            //console.log(elements);
            var tmp = [];
            for(z in elementsData){
                //console.log(elementsData[z].dataToSend);
                if(elementsData[z].dataToSend){
                if(elementsData[z].dataToSend){
                tmp.push({
                    name:elementsData[z].name,
                    status:elementsData[z].dataToSend.status
                });
                }
                }
                
            }
            // Send data to the server
            socket.emit('updateElements',tmp);
        }

        var updateElement = function(t,x){
           //elements[x].dataToSend = dataToSend;
            if(elements[x].DB && elements[x].OFFSET && s7client.Connected() && connected){
                (function(x){
                s7client.DBRead(parseInt(elements[x].DB),parseInt(elements[x].OFFSET),2,function(err,data){
                    if(err){
                        dataToSend.status.status = 'Failed to Read DB';
                        dataToSend.status.color = 'red';
                        elements[x].dataToSend = dataToSend; 
                        console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));    
                    }
                    else{
                        var status = data.readUIntBE(0, 2);
                        elementInfo.getStatus(elements[x],status,function(status){
                           
                            dataToSend.status = status;
                            elements[x].dataToSend = dataToSend; 
                            //console.log(elements[x].dataToSend);
                        });
                        if(counter === ammountOfElements){

                            sendData(elements);
                        }
                    };   
                });
                })(x);

            }else{
                elements[x].dataToSend = dataToSend; 
                if(counter === ammountOfElements){
                   // sendData();
                }
            };
            
        };
        var ammountOfElements = 0;
        for(x in elements){
            ammountOfElements++;
        }

        // Update the status of all the elements from the PLC.
        var counter = 0;
        for(x in elements){
            updateElement(x,counter++);
        }       

        setTimeout(updateElements,2000);
    } 
    updateElements();
    var containsElement = function(tmp){
        for(y in elements){
            if(elements[y].name === tmp.name){
                return true;
            }
        }
        return false;
    }

    socket.on('addElement', function(element){
        if(!containsElement(element)){
            elements.push(element);
        }
    });

});



