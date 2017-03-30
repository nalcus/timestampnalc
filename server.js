var express = require('express')
var dateFormat = require('dateformat');
var app = express()

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res) {
    var str=req.path
    
    while(str.charAt(0) === '/')
    {
     str = str.substr(1);
    }
    
    if (isNaN(str)) {
        str=decodeURI(str)
        var userDate = new Date(str)
    } else {
        var userDate = new Date(1000*parseInt(str))
    }
    
    var timestamp = {unix:null,natural:null}

    var valid = (userDate.getTime() > 0);
    
    if (valid) {
     timestamp["unix"]=userDate.getTime()/1000
     timestamp["natural"]=dateFormat(userDate,"longDate")
    }
    
    
    
    res.json(timestamp)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});