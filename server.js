const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { PORT } = require('./config')

const app = express();

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'static')))

// 设置openai代理设置
app.use('/v1/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(req.originalUrl);
    // 添加 OpenAI API 密钥到请求头，这里默认让请求头携带
    // proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    proxyRes.headers["Access-Control-Allow-Headers"] =
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With";
  },
}));

// 设置监听端口
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error(err)
})