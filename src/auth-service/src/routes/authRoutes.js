const express = require("express");
const authController=require("../controller/authController")
const cookieParser=require('cookie-parser')
const passport=require('../config/passport')
const router=express.Router()

router.post('/signup',authController.signup);
router.post('/login',authController.login)
router.post('/refresh', cookieParser(), authController.refresh)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route 2: Google jab wapas bhejta hai, yahan handle hota hai
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    authController.googleCallback
);
module.exports=router