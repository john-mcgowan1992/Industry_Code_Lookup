const express = require('express'),
      request = require('request'),
      industry_db = require('./seed_db'),
      pdfData = require('./parse_pdf.js'),
      fs = require('fs');

const app = express()

app.get("/", function(req, res) {
    res.send("Hello")
})

app.get("/api/fetch_raw_pdf", function(req, res) {
    function onSuccess() {
        res.status(200)
        res.send("PDF installed")
    }
    var endpoint = "http://www.fastcomp.com/downloads/fastcompclasscodecrossreferenceguide.pdf",
        pdf = request.get(endpoint, onSuccess).pipe(fs.createWriteStream('raw.pdf'))
})

app.get("/api/process_pdf", function(req, res) {
    parser.parse();
    res.status(200)
    res.send("PDF Parsed")
})

app.get("/api/industryCodes/all", function(req, res) {
    industry_db.findAll().then(codes => {
        res.json(codes);
    })
})

app.get("/api/industryCodes/naics/:naicsCode", function(req, res) {
    var code = req.params.naicsCode;
    industry_db.findAll({
        where:{
            NAICS: code
        }
    }).then(codes => {
        res.json(codes)
    })
})

app.get("/api/industryCodes/ncci/:ncciCode", function(req, res) {
    var code = req.params.ncciCode;
    industry_db.findAll({
        where: {
            NCCI: code
        }
    }).then(codes => {
        res.json(codes)
    })
})

app.get("/api/industryCodes/ca_wc/:ca_wcCode", function(req, res) {
    var code = req.params.ca_wcCode;
    industry_db.findAll({
        where: {
            CA_WC: code
        }
    }).then(codes => {
        res.json(codes)
    })
})

app.get("/api/industryCodes/description/:descriptionText", function(req, res) {
    var descriptionText = req.params.descriptionText;
    industry_db.findAll({
        where: {
            description: {
                $like: "%" + descriptionText + "%"
            }
        }
    }).then(codes => {
        res.json(codes);
    })
})

app.listen(3500, function() {
    console.log("Express server running on Port 3500")
})