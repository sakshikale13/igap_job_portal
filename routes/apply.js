var express = require("express");
var bodyparser = require("body-parser");
const App = require("../models/Apply");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async (req, res) => {
    let body = req.body;
    let app = new App();
    console.log(body);
    console.log(app);
    if (body.data.id != "") {
        app= await App.findByIdAndUpdate(body.data.id);
    }
    app.joblistid= body.data.joblistid;
    app.companyid= body.data.companyid;
    app.applicationdate= body.data.applicationdate;
    app.coverletter= body.data.coverletter;
    app.status= body.data.status;
    
    app.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

});
router.post("/list", async (req, res) => {
    let app = await App.find();
    res.json({ data: app });
});
router.post("/get", async (req, res) => {
    let body = req.body;
    let app = await App.findById(body.data.id);
    res.json({ data:app });
});
router.post("/delete", async (req, res) => {
    let body = req.body;
    await App.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});
module.exports = router;     