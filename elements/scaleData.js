
module.exports = {
    init:function(db,Datastore,s7client,directory){
        var scales = [];
        var readFlowrate = function(DB,OFFSET,database){
            if(s7client.Connected()){
                s7client.DBRead(parseInt(DB),parseInt(OFFSET)+26,4,function(err,data){
                if(err){
                        return console.log(' >> DBRead failed. Code #' + err + ' - ' + s7client.ErrorText(err));    
                }
                else
                    var flowrate = data.readUIntBE(0, 4);
                    database.insert({
                        dateTime:new Date(),
                        value:flowrate
                    })
                });    
            }
        }
        var initilizeScales = function(){
            for(x in scales){
                var scale = scales[x];
                scale.dbFlow = new Datastore({ filename: directory + '/database/scales/'+scale.name+'_Flowrate_data', autoload: true });
                readFlowrate(scale.DB,scale.OFFSET,scale.dbFlow);
            }
        };
        console.log('Starting scale data');
        db.find({type:'FB40'},function(err,docs){
            if(err) console.log(err);
            scales = docs;
            initilizeScales();
        })
    }
};