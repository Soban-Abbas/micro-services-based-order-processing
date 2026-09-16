const express = require("express");
const authController=require("../controller/authController")
const cookieParser=require('cookie-parser')
const router=express.Router()

router.post('/signup',authController.signup);
router.post('/login',authController.login)
router.post('/refresh', cookieParser(), authController.refresh)
module.exports=router