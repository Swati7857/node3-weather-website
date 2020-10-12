
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require('request');

const forecast=(longitude,lattitude,callback)=>
{
  const url="http://api.weatherstack.com/current?access_key=ff7374f15e976afbf12a077aed31b598&query="+encodeURIComponent(longitude)+","+encodeURIComponent(lattitude);

   request({url,json:true},(err,{body}={})=>
   {
    if(err)
      {
        callback('Unable  to connect to the weather Sevice',undefined);
      }
     
      else if(body.error)
      {
        callback('Coordinate error, pass string for error',undefined);
      }
      else
      {
        
        callback(undefined,'we are in '+body.location.name+' and current temp is '+body.current.temperature+' but it feels like '+body.current.feelslike+
                '. There are '+body.current.precip+' % chances of rain. the cloudover is  '+body.current.cloudcover +'  and pressure is   '+body.current.pressure
              );
    }    
  })
}


module.exports=forecast;


