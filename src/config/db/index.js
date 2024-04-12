const mongoose = require('mongoose');

async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('connect thanh cong!')
    } catch (error) {
        console.log('connect that bai!')
    }

}

module.exports = { connect };