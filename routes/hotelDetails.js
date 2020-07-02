let express = require('express');
let router = express.Router();
let fs = require("fs");

const dataPath = "./CityJSON/easemytrip.json";
const Bangalore = './CityJSON/bangalore_hotels.json';
const Chennai = './CityJSON/chennai_hotels.json';
const Delhi = './CityJSON/delhi_hotels.json';
const Guwahati = './CityJSON/guwahati_hotels.json'
const Hyderabad = './CityJSON/hydrabad_hotels.json'
const Kolkata = './CityJSON/kolkata_hotels.json';
const Mumbai = './CityJSON/mumbai_hotels.json';
const CityArray = [Bangalore,Chennai,Delhi,Guwahati,Hyderabad,Kolkata,Mumbai];
router.get("/", (req, res) => {
    console.log(req.query);
    fs.readFile(CityArray[req.query.City], "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});

module.exports = router;