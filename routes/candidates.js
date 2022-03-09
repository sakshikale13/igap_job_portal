var express = require("express");
var bodyparser = require("body-parser");
const Candidates = require("../models/Candidates");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/save", async (req, res) => {
    let body = req.body;
    console.log(body);
    console.log(res.data);
    
    let candidates = new Candidates();
    if (body.data.id != "") {
        candidates= await Candidates.findById(body.data.id);
    }
    candidates.name = body.data.name;
    candidates.email=body.data.email;
    candidates.mobilenumber=body.data.mobilenumber;
    candidates.city=body.data.city;
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
        let photopath = body.data.photopath.replace(/^data:image\/[a-z]+;base64,/, "");
        imagename = "candidatespics/" + imagename + ".png";
        fs.writeFile("public/" + imagename, photopath, 'base64', function(res) {
                console.log("Success");
            },
            function(err) {
                console.log("Error image saving-" + err);
            });
        candidates.photopath = imagename;
    }
    if (body.data.resumepath != "") {
        let imagename = (Math.random() + 1).toString(36).substring(2);
        let resumepath = body.data.imagepath.replace(/^data:zip\/[a-z]+;base64,/, "");
        imagename = "candidatespics/" + imagename + ".png";
        fs.writeFile("public/" + imagename, resumepath, 'base64', function(res) {
                console.log("Success");
            },
            function(err) {
                console.log("Error image saving-" + err);
            });
        candidates.resumepath = imagename;
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


router.post("/login/", async(req, res)=>{
    console.log(req.body);
    let body = req.body;
    console.log(body);
    let admin = await Candidates.find().and([{email: body.data.email}, {password: body.data.password}]);
    console.log(body);
    console.log(admin);
    let data = {
        "data":
        {
            "status":"failed"
        }
    }
    if(admin.length != 0)
    {        
        let authkey = (Math.random() + 1).toString(36).substring(2);

        admin = await Candidates.findById(admin[0]._id);
        admin.authkey = authkey;
        admin.save();
        data = {
            "data":
            {
                "status":"success",
                "name":admin.name,
                "email":admin.email,
                "authkey":authkey
            }
        }
    }
    res.end(JSON.stringify(data));
});
module.exports = router;     