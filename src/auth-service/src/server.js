const express = require("express");
const helmet = require('helmet')
const morgan = require('morgan');


const startupApp = async () => {

    const app = express();
    const port = 8001;
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/health',(req, res)=>{
        res.status(200).json({
            message:"Your api hit auth service health endpoint "
        })
    })
    app.listen(port, () => {
        console.log(`Auth Service is Listening to http://localhost:${port}`);
    });


};

startupApp();