var express = require("express");
var cookie = require("cookie-parser");
var body = require("body-parser");
var multer = require("multer");
const mongoose = require("mongoose");

var app = express();


app.use(body.json({ limit: '50mb' }));
app.use(body.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.static('public'));



mongoose.connect("mongodb://localhost:27017/igap_job_portal");
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection Established"));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.listen(8081, function() {
    console.log("server running")
})

app.get("/", function(req, res) {
    res.send("hello")
});

app.use("/authentication", require("./routes/authentication"));
app.use("/companies",require("./routes/companies"));