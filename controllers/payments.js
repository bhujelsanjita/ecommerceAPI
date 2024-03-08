const express = require("express");
const sequelize = require("sequelize");
const Payments = require("../models/payments");
const database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");

let PaymentController = {
  addPayments: (req, res) => {
    if (
      req.headers.authorization == null ||
      req.headers.authorization == undefined ||
      req.headers.authorization == ""
    ) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      let token = req.headers.authorization.split("")[1];
      try {
        let Decodetoken = jwt.decode(token);
        console.log(Decodetoken);
      } catch (err) {
        return res.status(403).send({
          success: false,
          message: "Invalid token",
        });

      }
      let pid = Math.floor(Date.now()/1000);
      let uid = Decodetoken.id;
      Payments.create({ //insert into payments(userId,PaymentMethod,PaymentId..) Values(uid,req.body.method,pid)
        userId:uid ,
        PaymentMethod: req.body.method,
        PaymentId: pid,
        BankInfo: req.body.bankname,
        AccountNumber: req.body.accountname,
        AccountHoldersName: req.body.accountholdername
      })
      .then((result)=>{
            return res.status(200).send({
                success:true,
                message: "Payments Created"
            })
      })
      .catch((err)=>{
            return res.status(403).send({
                success:false,
                message:"Something went Wrong"
            })
      })
    }
  },
};
