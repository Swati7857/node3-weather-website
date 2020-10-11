const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const cors=require('cors');
const app=express();

app.use(cors());
const port=process.env.PORT || 3000;

//define paths for express config
const publicDirPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');


//setup handlebas location and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup to serve static directory
app.use(express.static(publicDirPath))

app.get('/',(req,res)=>
{

    res.render('index',{
        title:'weather app',
        name:'andrew mead'
    })
})
app.get('/about',(req,res)=>
{

    res.render('about',{
        title:'About me',
        name:'siya'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
      helptext:'help me please',
      title:'Help',
      name:'siya'
    })
})
app.get('/weather',(req,res)=>
{
  if(!req.query.address)
  {
      return res.send({error:'you are missing search params' })
  }
 
  geocode(req.query.address,(error,{lattitude,longitude,location}={})=>
  {
      if(error)
      {
        console.log('geocode  ::'+error); 
        return res.send({error})
      }
  
      forecast(longitude,lattitude, (error, forecastData) => {
        if(error)
        {
          console.log('forecast  : '+error); 
          return res.send({error})
        }
       console.log(forecastData);
       res.send({
         forecast:forecastData,
           location,
          address:req.query.address
                })
         })

   })
   
})
app.get('*',(req,res)=>
{
  
  res.render('404',{
    errortext:'Page not found',
    title:'About me',
    name:'Andrew mead '
  })
})
app.listen(port,()=>{
    console.log('server listening on port ',port)
})