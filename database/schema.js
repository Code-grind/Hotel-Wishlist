const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    FullName: String,
    Email: String,
    Password: String,
    Wishlist: [{type: Schema.Types.ObjectId, ref: 'hotelSchema'}]
});
let hotelSchema = new Schema({
    RecevID: {type: Schema.Types.ObjectId, ref: 'startupSchema'},
    Name: String,
    Price: Number,
    Address: String,
    Rating: String
});
let user = mongoose.model('Users',userSchema);
let hotel = mongoose.model('Hotel',hotelSchema);

module.exports = {
    user,
    hotel
};