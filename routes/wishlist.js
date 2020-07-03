let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');

router.get('/', function (req, res) {
    if (req.user) {
        console.log('Get Wishlist')
        let itemsProcessed = 0;
        let wishListHotel = [];
        req.user.Wishlist.forEach(function (value, index, array) {
            Schema.hotel.findOne({ _id: value }).lean().exec(function (err, msg) {
                if (err) return done(err);
                if (msg === null) res.sendStatus(404);
                wishListHotel.push(msg);
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    AfterAllDataReceived();
                }
            })
        });
        function AfterAllDataReceived() {
            res.send(wishListHotel);
        }
    }
    else {
        res.render('404 not found');
    }
});

/**Route to store user Wishlist*/
router.post('/', function (req, res) {
    console.log('Here');
    let wishedhotel = [];
    req.body.wishlist.forEach(hotel => {
        // console.log(hotel);
        wishedhotel.push(Schema.hotel({
            RecevID: req.user.id,
            Name: hotel.Name,
            Price: hotel.Price[0],
            Address: hotel.Address[0],
            Rating: hotel.Rating[0]
        }));
    });

    wishedhotel.forEach(hotel => {
        hotel.save(function (err, data) {
            if (err) throw err;
            Schema.user.findOne({ _id: req.user.id }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user === null) {
                    res.sendStatus(404);
                }
                user.Wishlist.push(data._id);
                user.save(function (err, data) {
                    if (err) throw err;
                });
                console.log(data)
            });
        });
    });

    res.send("done");
});

/**Route to Delete a notification*/
router.delete('/', function (req, res) {
    console.log('DELETE')
    console.log(req.body),
    // res.send('done');
    Schema.hotel.findById(req.body.id, function (err, recipient) {
        if (err)
            return done(err);
        Schema.user.updateOne({ _id: recipient.RecevID }, {
            $pull: { 'Wishlist': req.body.id }
        }, function (err) {
            if (err)
                return done(err);
            console.log('User Updated');
            Schema.hotel.deleteOne({ _id: req.body.id }, function (err) {
                if (err)
                    return done(err);
                console.log('Deletion Done');
                res.send('Deletion done');
            });
        })
    });
});

module.exports = router;
