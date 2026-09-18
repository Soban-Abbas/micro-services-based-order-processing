exports.globalErrorHandler=(err , req , res , next)=>{
    console.log(err.message || 'server error')
    res.status(err.statusCode ||500).json({
        message:err.message||"Internal Server Error"
    })
}