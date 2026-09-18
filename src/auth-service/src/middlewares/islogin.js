
exports.islogin=(req ,res , next)=>{
    if (!req.cookies.refresh_token && req.cookies.access_token){
        res.status(401).json({
            "success": false,
            "message": "You are not logged in."
        }
)
    }
next()
}