const express = require('express');
// TO MAKE ROUTING WE USE EXPRESS ROUTER METHOD
const Router = express.Router();
Router.get('/',function(req,res){
   return res.send('<h1>Homepage</h1>');//res.send()is used to send both html and json  
})
Router.get('/about-me',(req,res)=>{
   let Me = {
      Name:'Sanjita Bhujel',
      Age:21,
      height:'6ft',

   }
   res.send({Me});
})

module.exports = Router;
// model-database
// view-visual parts of the system
// controller-something that contreols the behaviour of the system
// there is no view  in API



