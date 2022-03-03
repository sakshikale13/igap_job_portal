var express = require("express");
var bodyparser = require("body-parser");
const Companies = require("../models/Companies");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async (req, res) => {
    let body = req.body;
    let companies = new Companies();
    console.log(body);
    console.log(companies);
    if (body.data.id != "") {
       companies= await Companies.findByIdAndUpdate(body.data.id);
    }
    companies.name = body.data.name;
    companies.address = body.data.address;
    companies.city = body.data.city;
    companies.contactperson = body.data.contactperson;
    companies.contactno = body.data.contactno;
    companies.email = body.data.email;
    companies.description = body.data.description;
    
    companies.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

});
router.post("/list", async (req, res) => {
    let companies = await Companies.find();
    res.json({ data: companies });
});
router.post("/get", async (req, res) => {
    let body = req.body;
    let companies = await Companies.findById(body.data.id);
    res.json({ data:companies });
});
router.post("/delete", async (req, res) => {
    let body = req.body;
    await Companies.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});
module.exports = router;     