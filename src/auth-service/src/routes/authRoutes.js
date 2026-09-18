const express = require("express");
const authController=require("../controller/authController")
const cookieParser=require('cookie-parser')
const passport=require('../config/passport')
const {islogin}=require('../middlewares/islogin')
const router=express.Router()

router.post('/signup',authController.signup);
router.post('/login',authController.login)
router.post('/refresh', cookieParser(), authController.refresh)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// google redirect url when it res ready it send that user details on this route
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    authController.googleCallback
);
router.get('/login-failed',(req , res , next)=>{
    res.send('login failed try again in few times')
});

router.post('/logout',islogin,authController.logout)
module.exports=router