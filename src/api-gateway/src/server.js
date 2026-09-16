import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import  cookieParser from 'cookie-parser'
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser())
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:8000', // Apne frontend ka exact URL likhein (no slash '/')
    credentials: true
}));
app.use(morgan('dev'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, 
});
app.use(limiter);


app.get('/health', function(req, res,next){
console.log(req.header('Cookie'))
console.log(req.cookies)
    res.status(200).json({ status: 'API Gateway is running' });
});


const proxyOptions = {
    changeOrigin: true,

};


app.use('/api/auth', createProxyMiddleware({
    target:  'http://localhost:8001',
    ...proxyOptions,
// onProxyReq:function(proxyReq,req , res){
//     console.log(req.header('Cookie'))
//     if(req.cookie){
//         proxyReq.setHeader('Cookie',req.header('Cookie'))
//     }
// }
}));

app.use('/api/customer', createProxyMiddleware({
    target:  'http://localhost:8002',
    ...proxyOptions,
}));

app.use('/api/admin', createProxyMiddleware({
    target:  'http://localhost:8003',
    ...proxyOptions,
}));


app.use('/api/products', createProxyMiddleware({
    target: 'http://localhost:8004',
    ...proxyOptions,
}));

app.use('/api/cart', createProxyMiddleware({
    target: 'http://localhost:8005',
    ...proxyOptions,
}));

app.use('/api/inventory', createProxyMiddleware({
    target: 'http://localhost:8006',
    ...proxyOptions,
}));

app.use('/api/search', createProxyMiddleware({
    target: 'http://localhost:8007',
    ...proxyOptions,
}));

app.use('/api/orders', createProxyMiddleware({
    target:  'http://localhost:8008',
    ...proxyOptions,
}));

app.use('/api/payments', createProxyMiddleware({
    target: 'http://localhost:8009',
    ...proxyOptions,
}));

app.use('/api/notification', createProxyMiddleware({
    target:  'http://localhost:8010',
    ...proxyOptions,
}));

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found in API Gateway' });
});

app.listen(PORT, () => {
    console.log(` API Gateway running on port ${PORT}`);
});