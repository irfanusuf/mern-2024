
const mongoose = require("mongoose")

const Product = mongoose.model("Product" ,{

productName : {type : String , require :true},
description : {type : String , require :true},
imageUrl : {type : String},
size : {type :String},
color: {type :String},
qty : {type: Number},
price : {type : Number}



})



module.exports = {Product}