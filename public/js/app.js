

console.log('client side js file is loaded');


const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');


const messagetwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location=search.value;
    console.log( location)

           messageOne.textContent='loading';
            messagetwo.textContent='';
    fetch('/weather?address='+location)
     .then((response)=>
    { 
    response.json().then((data)=> {
       
        if(data.error)
        {
            console.log(data.error) ;
            messageOne.textContent=data.error;
        }
        else
        {
            messageOne.textContent=data.forecast;
            messagetwo.textContent=data.location;
          //  console.log(data.forecast) 
        //    console.log(data.location) 

        }
               
     })
})
})

