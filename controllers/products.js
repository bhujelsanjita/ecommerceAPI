const Product = require("../models/products");
const express = require("express");
const dbconfig = require("../config/dbconfig");
const sequelize = require("sequelize");
const Category = require("../models/category");
const jwt = require("jsonwebtoken");
let productController = {
  addProduct: (req, res) => {
    console.log(req);
    if (
      req.headers.authorization == null ||
      req.headers.authorization == "" ||
      req.headers.authorization == undefined
    ) {
      return res.status(403).send({
        success: false,
        message: "unauthorized Access",
      });
    } else {
      let token = req.headers.authorization.split(" ")[1];
      try {
        let decodedToken = jwt.decode(token);
        console.log(decodedToken);
      } catch (err) {
        return res.status(403).send({
          success: false,
          message: "unauthorised login",
        });
      }
      Product.create({
        //to insert into data base
        productId: req.body.id,
        productName: req.body.name,
        productWaranty: req.body.wrnty,
        stock: req.body.stock,
        productImage: req.body.image,
        price: req.body.price,
      })
        .then((result) => {
          console.log(result);
          return res.send("Product created");
        })
        .catch((err) => {
          console.log(err);
          return res.send("something went wrong");
        });
    }
  },
  getAllProducts: (req, res) => {
    // if (
    //   req.headers.authorization == null ||
    //   req.headers.authorization == "" ||
    //   req.headers.authorization == undefined
    // ) {
    //   return res.status(403).send({
    //     success: false,
    //     message: "unauthorized access",
    //   });
    // }
    // else {
    Product.findAll({
      raw: true,
      attributes: [
        "ProductId",
        "productName",
        "productWaranty",
        "productImage",
        "stock",
        "price",
        "categoryId",
      ],
    })
      .then((result) => {
        console.log(result);
        if (result == null) {
          return res.status(403).send({
            status: false,
            message: "Product not found",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Product found",
            data: result,
          });
        }
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: "error found",
        });
      });
    // }
  },
  getAllCategory: (req, res) => {
    Category.findAll({
      raw: true,

      attributes: ["CategoryName"],
    })
      .then((result) => {
        if (result == null) {
          return res.status(403).send({
            success: false,
            message: "category not found",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "category found",
            Data: result,
          });
        }
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: "error found",
        });
      });
  },
  addCategory: (req, res) => {
    if (req.body.CategoryName == null || req.body.CategoryName == "") {
      return res.status(403).send({
        success: false,
        message: "Please provide CategoryName",
      });
    } else {
      let id = Math.round(Date.now() / 1000);
      Category.create({
        CategoryName: req.body.CategoryName,
        CategoryId: id,
      })
        .then((result) => {
          console.log(result);
          return res.status(200).send({
            success: true,
            message: "Category added successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(403).send({
            success: false,
            message: "Error",
          });
        });
    }
  },
  getAllProductByCategory: (req, res) => {
    Product.findAll({
      raw: true,
      where: {
        category: req.params.category,
      },
    })
      .then((result) => {
        if (result == null) {
          return res.status(404).send({
            success: false,
            message: "No product Found",
          });
        } else {
          return res.status(200).send({
            success: true,
            data: result
          })
        }
      })
      .catch((err) => {
        return res.status(403).send({
          success: false,
          message: "Something went wrong"
        })
      });
  },
  
};

module.exports = productController;
