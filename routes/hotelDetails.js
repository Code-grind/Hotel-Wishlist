let express = require('express');
let router = express.Router();
let fs = require("fs");

const dataPath = "./easemytrip.json";

router.get("/", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    });
});

module.exports = router;