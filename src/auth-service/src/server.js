const express = require("express");
const helmet = require('helmet')
const morgan = require('morgan');
const authRoutes = require("./routes/authRoutes")
const { globalErrorHandler } = require("./middlewares/globalErrorMiddleware")
const startupApp = async () => {

    const app = express();
    const port = 8001;
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(authRoutes)
    app.use('/health', (req, res) => {
        res.status(200).json({
            message: "Your api hit auth service health endpoint "
        })
    })
    app.use(globalErrorHandler)
    app.listen(port, () => {
        console.log(`Auth Service is Listening to http://localhost:${port}`);
    });


};

startupApp();