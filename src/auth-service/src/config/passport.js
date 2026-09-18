// src/config/passport.js
const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userRepository = require("../repository/userRepository");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.client_id,
            clientSecret: process.env.client_url,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // profile me Google se mili info hoti hai: naam, email, photo, etc.
                const email = profile.emails[0].value;

                // Check karo ye email pehle se DB me hai
                let user = await userRepository.findByEmail(email);

                if (!user) {
                    // Naya user banao (password NAHI chahiye, kyunke Google se verified hai)
                    user =await userRepository.registerNewUser(email,null,'customer')
                }

                // "done" ka matlab: "verification complete ho gayi, ye user hai"
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;