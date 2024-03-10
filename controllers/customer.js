const express = require("express");
const DataBase = require("../config/dbconfig");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Address = require("../models/Address");
const bcrypt = require("bcrypt");

let CustomerController = {
  CustomerRegistration: (req, res) => {
    if (
      req.headers.authorization == null ||
      req.headers.authorization == undefined ||
      req.headers.authorization == ""
    ) {
      return res.status(403).send({
        success: false,
        message: "unauthorized",
      });
    } else {
      let token = req.headers.authorization.split(" ")[1];
      try {
        let DecodeToken = jwt.decode(token);
      } catch (err) {
        return res.status(403).send({
          success: false,
          message: "Invalid Token",
        });
      }

      let id = Math.floor(Date.now() / 1000);
      let encryptedPassword = bcrypt.hashSync(req.body.CustomerPassword, 10);
      Customer.create({
        CustomerID: id,
        CustomerName: req.body.CustomerName,
        CustomerPassword: encryptedPassword,
        CustomerEmail: req.body.CustomerEmail,
      })
        .then((result) => {
          return res.status(200).send({
            success: true,
            message: " Account created Succesfully",
          });
        })
        .catch((err) => {
          return res.status(403).send({
            success: false,
            message: "Something went wrong",
          });
        });
    }
  },
  CustomerLogin: (req, res) => {
    if (
      req.body.CustomerEmail == "" ||
      req.body.CustomerEmail == null ||
      req.body.CustomerPassword == null ||
      req.body.CustomerPassword == ""
    ) {
      return res.status(403).send({
        success: false,
        message: "Please provide Valid email and password",
      });
    } else {
      Customer.findOne({
        raw: true,
        where: {
          CustomerEmail: req.body.CustomerEmail,
        },
      })
        .then(async (result) => {
          if (result == null || result == 0) {
            return res.status(404).send({
              success: false,
              message: "Account not found",
            });
          }
          console.log(result);
          console.log(result.CustomerPassword);
          const isValid = await bcrypt.compare(
            req.body.CustomerPassword,
            result.CustomerPassword
          );
          console.log(isValid);
          if (isValid) {
            let token = jwt.sign(result, "sanjita");
            return res.status(200).send({
              sucess: true,
              message: "Login Success",
              token: token,
            });
          } else {
            return res.status(403).send({
              success: false,
              message: "Email or Password didn't match",
            });
          }
        })
        .catch((err) => {
          return res.status(403).send({
            success: false,
            message: "Something went wrong",
          });
        });
    }
  },
  SaveAddress: (req, res) => {
    if (
      req.headers.authorization == null ||
      req.headers.authorization == "" ||
      req.headers.authorization == undefined
    ) {
      return res.status(403).send({
        success: false,
        messsage: "Unauthorised Access",
      });
    } else {
      let token = req.headers.authorization.split(" ")[1];
      try {
        var DecodedToken = jwt.decode(token);
      } catch (err) {
        return res.status(403).send({
          success: false,
          message: "Something went wrong",
        });
      }
      Address.findOne({
        raw: true,
        where: {
          CustomerId: DecodedToken.CustomerID,
        },
      }).then((result) => {
        let AddressId = Math.floor(Date.now()/1000);
        if (result == null) {
          Address.create({
            CustomerId: DecodedToken.CustomerID,
            AddressId: AddressId,
            Address: req.body.Address,
            OptionalAddress: req.body.optionaladdress,
            State: req.body.state,
            City: req.body.city
          })
          .then((result)=>{
            return res.status(200).send({
                success: true,
                message:"Address saved succesfully"
            })
          })
          .catch((err)=>{
            return res.status(404).send({
                success: false,
                message:"something went wrong"
            })
          })
        }
        else{
            return res.status(200).send({
                success: true,
                message: "address already exist"
                
            })
        }
      });
    }
  },
  UpdateAddress: (req,res)=>{
    if(
        req.headers.authorization ==null ||
        req.headers.authorization == "" ||
        req.headers.authorization == undefined
    ){
        return res.status(403).send({
            success: false,
            message: "unauthorised access"
        })
    }
    else{
        let token = req.headers.authorization.split(" ")[1];
        try{
            var DecodedToken = jwt.decode(token);
        }
        catch(err){
            return res.status(404).send({
                success: false,
                message: "somethingg went wrong"
            })
        }
        console.log(DecodedToken.CustomerName);
        Address.update({
            Address: req.body.address,
            OptionalAddress: req.body.optionaladdress,
            State: req.body.state,
            City: req.body.city
        },{
            raw: true,
            where :{
                CustomerId: DecodedToken.CustomerID
            }
        })
        .then((result)=>{
            if(
                result == null ||
                result[0] == 0
                // [1]= one roe affected
                // [0]= 0 rows affected means no update has occur
            ){
                 return res.status(200).send({
                    success: true,
                    message: "Unable to update address"
                 });
            }
            else{
                return res.status(200).send({
                    success: true,
                    message:" address updated successfully"
                })
            }
        })
    }
  }
};
module.exports = CustomerController;
