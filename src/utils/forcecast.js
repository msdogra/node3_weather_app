const request = require('request');

const forecast= (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/2faaf7e6d57280f1be9598c815277d35/' +longitude+',' + latitude;
   request({url,json:true} ,(error,{body})=>{
        if (error){
            callback("Could not connect to forecast service",undefined)
        } else if(body.daily.data.length===0){
            callback("Forecast not available!",undefined)
        } else {
            const msg = body.currently.summary + '. It is currently ' + body.currently.temperature + ' with ' + (body.currently.precipProbability * 100) + ' % chance of rain.'
            callback(undefined,msg)
        }

   })
}
   module.exports=
   {
    forecast:forecast
   }


