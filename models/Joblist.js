const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        companyid:{type:String},
        title:{type:String},
        experience:{type:String},
        description:{type:String},
        package:{type:String},
        location:{type:String},
        createdate:{type:String},
        qualificationreq:{type:String},
        status:{type:String},
        
    }
);
const Joblist = mongoose.model("job_list", schema);
module.exports = Joblist;  