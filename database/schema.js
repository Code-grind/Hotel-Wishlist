const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    FullName: String,
    Email: String,
    Password: String,
    Wishlist: Array
});

let user = mongoose.model('Users',userSchema);

module.exports = {
    user
};