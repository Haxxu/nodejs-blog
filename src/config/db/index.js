const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost/f8_education_dev');
        console.log('Connect db successful!!');
    } catch (error) {
        console.log('Connect db failure!!');
    }
}

module.exports = { connect };
