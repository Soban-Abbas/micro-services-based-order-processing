import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, 
});
app.use(limiter);


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway is running' });
});


const proxyOptions = {
    changeOrigin: true,
};


app.use('/api/auth', createProxyMiddleware({
    target:  'http://localhost:8001',
    ...proxyOptions,
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