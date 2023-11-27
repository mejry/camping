console.clear();
const users = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://azzizzflash:aziz123@cluster0.6odhd5c.mongodb.net/users",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log('database connect')

        let webmaster = await users.findOne({
            role: 'Admin',
        });

        if (!webmaster) {
            let password = 'adminpassword'
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            let new_user = new users({
                nom: 'younes',
                prenom: 'manita',
                email: 'younesmanita975@gmail.com',
                password: hashed,
                role: 'Admin',
            });
            await new_user.save();
            console.log(`webmaster account has been added : ${new_user.email}`);
        } else {
            console.log(` webmaster account already exist \n webmaster email : ${webmaster.email}`);
        }
    } catch (error) {
        console.log(error)
        console.log("database is not connect");
    }
};

module.exports = connectDB;