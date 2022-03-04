var express = require("express");
var bodyparser = require("body-parser");
const Candidates = require("../models/Candidates");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async (req, res) => {
    let body = req.body;
    console.log(body);
    
    let candidates = new Candidates();
    if (body.data.id != "") {
        candidates= await Candidates.findByIdAndUpdate(body.data.id);
    }
    candidates.name = body.data.title;
    candidates.email=body.data.email;
    candidates.mobileno=body.data.mobileno;
    candidates.gender=body.data.gender;
    candidates.address=body.data.address;
    candidates.qualification=body.data.qualification;
    candidates.explevel=body.data.explevel;
    candidates.photopath=body.data.photopath;
    candidates.resumepath=body.data.resumepath;
    candidates.password=body.data.password;
    candidates.authkey=body.data.authkey;

    if (body.data.photopath != "") {
        let imagename = (Math.random() + 1).toString(36).substring(2);
        let imagepath = body.data.imagepath.replace(/^data:image\/[a-z]+;base64,/, "");
        imagename = "candidatespics/" + imagename + ".png";
        fs.writeFile("public/" + imagename, imagepath, 'base64', function(res) {
                console.log("Success");
            },
            function(err) {
                console.log("Error image saving-" + err);
            });
        candidates.imagepath = imagename;
    }
    
    candidates.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
    });

});
router.post("/list", async (req, res) => {
    let candidates = await Candidates.find();
    res.json({ data: candidates });
});
router.post("/get", async (req, res) => {
    let body = req.body;
    let candidates = await Candidates.findById(body.data.id);
    res.json({ data:candidates });
});
router.post("/delete", async (req, res) => {
    let body = req.body;
    await Candidates.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});
module.exports = router;     