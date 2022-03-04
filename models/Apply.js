const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        joblistid:{type:String},
        companyid:{type:String},
        applicationdate:{type:String},
        coverletter:{type:String},
        status:{type:String}
    }
);
const App = mongoose.model("apply", schema);
module.exports = App;