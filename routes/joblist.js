var express = require("express");
var bodyparser = require("body-parser");
const Joblist = require("../models/Joblist");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async (req, res) => {
    let body = req.body;
    let job_list = new Joblist();
    console.log(body);
    console.log(job_list);
    if (body.data.id != "") {
        job_list = await Joblist.findByIdAndUpdate(body.data.id);
    }
    job_list.companyid = body.data.companyid;
    job_list.title= body.data.title;
    job_list.experience= body.data.expreience;
    job_list.description= body.data.description;
    job_list.package= body.data.package;
    job_list.location= body.data.location;
    job_list.createdate= body.data.createdate;
    job_list.qualificationreq= body.data.qualificationreq;
    job_list.status= body.data.status;
    
    job_list.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

});
router.post("/list", async (req, res) => {
    let job_list = await Joblist.find();
    res.json({ data: job_list });
});
router.post("/get", async (req, res) => {
    let body = req.body;
    let job_list = await Joblist.findById(body.data.id);
    res.json({ data:job_list });
});
router.post("/delete", async (req, res) => {
    let body = req.body;
    await Joblist.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});
module.exports = router;     