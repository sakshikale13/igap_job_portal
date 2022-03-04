
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
{
   name: {type:String},
    address: {type:String},
    email: {type:String},
    mobileno: {type:String},
    gender: {type:String},
    qualification: {type:String},
    explevel: {type:String},
    photopath: {type:String},
    resumepath: {type:String},
    password: {type:String},
    authkey: {type:String}
});
const Candidates = mongoose.model("candidates",schema);
module.exports= Candidates;