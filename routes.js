const express = require('express');
const Router = express.Router();
const productController = require('./controllers/products');
const administratorController = require('./controllers/administrator');
const BookingController = require('./controllers/Bookings');
const CustomerController = require('./controllers/customer')
Router.get('/',(req,res)=>{
 res.send('<p>This is Homepage</p>');
});
Router.get('/aboutme',(req,res)=>{
    res.send('<h1>Hello everyone  I am sanjita bhujel</h1>')
})
Router.post('/addProduct',productController.addProduct);
Router.post('/registerAdmin',administratorController.registerAdmin);
Router.post('/loginAdmin',administratorController.loginAdmin);
Router.post('/addCategory',productController.addCategory);
Router.post('/createBookings',BookingController.createBookings);
Router.post('/customerregistration',CustomerController.CustomerRegistration);
Router.post('/customerlogin',CustomerController.CustomerLogin);


/*

Routes for products

*/
Router.get('/getAllProducts',productController.getAllProducts);
Router.get('/getAllCategory',productController.getAllCategory);
// we can pass colon to make parameters dynamic in express router
// Router.get('/user/:username/:userid',function(req,res){
//    let text= `User Id of ${req.params.username} is ${req.params.userid}`;
//    res.send(`<h1>${text}</h1>`);
// })
Router.get('/product/:category',productController.getAllProductByCategory);





module.exports = Router;
