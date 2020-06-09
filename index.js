const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const request=require('request');
const path=require('path');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname , '/views')));
app.get('/',function(req,res){

   res.render('weather.ejs');
});

app.post('/getweatherdata',(req,res)=>{

   var temp,hum, press;
      const loc=req.body.location;
      const url='http://api.weatherstack.com/current?access_key=6f4be17f997b5bdc029fdebe5caa2740&query='+loc+'';
      request({url:url,json:true}, function (error, response, body) {
         temp=response.body.current.temperature;
         hum=response.body.current.humidity;
         press=response.body.current.pressure;
         res.render('getweather.ejs',{temp,hum,press});
});
       });
       


app.set('view engine','ejs');

app.listen(4444,()=>{console.log("server listning on port 4444")});

