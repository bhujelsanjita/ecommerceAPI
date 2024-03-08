const Administrator =  require('../models/Administrator');
const express = require('express');
const Database = require('../config/dbconfig');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let administratorController = {
    registerAdmin: (req,res)=>{
        if(
            req.body.AdminName == "" ||
            req.body.AdminName == null || 
            req.body.AdminPassword == "" ||
            req.body.AdminPassword == null ||
            req.body.AdminEmail == ""||
            req.body.AdminEmail == null ||
            req.body.AdminUsername == "" ||
            req.body.AdminUsername == null 
        ){
            console.log(req.body);
            
            return res.status(403).send({
                sucess: false,
                message: "Please fill all values properly"
            })
        }else{
            // console.log("received all values");
            // console.log(req.body)
            let id = Math.round(Date.now()/1000);

            let encryptedPassword = bcrypt.hashSync(req.body.AdminPassword,15);
            Administrator.create({
                AdminId:id ,
                AdminName: req.body.AdminName,
                AdminEmail: req.body.AdminEmail,
                AdminPassword: encryptedPassword,
                AdminUsername: req.body.AdminUsername
            }).then((result)=>{
                console.log(result);
                return res.status(200).send({sucess:true,message:'Registration completed'})
            }).catch((err)=>{
                console.log(err);
                return res.status(403).send({
                    sucess:false,
                    message: 'something went wrong'
                })
            });
            
        }
    },
    loginAdmin: (req,res)=>{
        if
        (
            req.body.AdminEmail == null ||
            req.body.AdminEmail == "" ||
            req.body.AdminPassword == null ||
            req.body.AdminPassword == ""
        ){
            return res.status(403).send({
                sucess:false,
                message:"please fill the form properly"
            })
        }
        else{
            Administrator.findOne({
                raw: true,
                where:{
                    AdminEmail: req.body.AdminEmail,
                    AdminPassword: req.body.AdminPassword
                }
            }).then((result)=>{
                console.log(result);
                let token  = jwt.sign(result,"sanjita");
                if (result == null){
                    return res.status(404).send({
                        success:false,
                        message: "user not found"

                    });
                }
                else{
                    return res.status(200).send({
                        success:true,
                        token: token,
                        message: "sucessfully loged in"
                    })
                }
                
            }).catch((err)=>{
                console.log(err);
                return res.status(403).send({
                    success: false,
                    message: "Unauthorized login"
                })
            })
        }  
    }
}

module.exports= administratorController;