const Bookings = require('../models/Bookings');
const express = require('express');
const sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');
const jwt = require('jsonwebtoken');
const Biling = require('../models/Billing');

let BookingController = {
    createBookings: (req, res)=>{
        if(
            req.headers.authorization ==null ||
            req.headers.authorization == "" ||
            req.headers.authorization == undefined
        )
        {
            return res.status(403).send({
                success: false,
                meassage: "Unauthorized access"
            });
        }
        else{
            let token = req.headers.authorization.split(" ")[1];
            try{
                let DecodeToken = jwt.decode(token);
                console.log(DecodeToken);
            }
            catch(err){
                return res.status(403).send({
                    success:false,
                    message: "Invalid token"
                });
            }
            let id = Math.floor(Date.now()/1000);
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            let billDate = year + "-" + month + "-" + day;

            Biling.create({
                BillId: id ,
                BillDate: billDate,
                Address:req.body.address,
                DeliveryDate: billDate+3
            })
            .then((result)=>{
                Bookings.create({
                    productName: req.body.productName,
                    CustomerName: req.body.CustomerName,
                    BillingId: id,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    status: req.body.status
                })
                .then((result)=>{
                    return res.status(200).send({
                        success: true,
                        message: "Bookings Created"
                    })
                })
                .catch((err)=>{
                    console.log(err);
                    return res.status(403).send({
                        success: false,
                        message: "Something went wrong"
                    })
                })
            })
            .catch((err)=>{
                console.log(err);
                return res.status(403).send({
                    success:false,
                    message: "something went wrong"
                })
            })
          
        }
    }
    
}
module.exports= BookingController;