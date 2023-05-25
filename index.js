const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/v1', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  // onProxyReq: (proxyReq, req, res) => {
  //   // 添加 OpenAI API 密钥到请求头
  //   proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
  // }
}));

app.listen(8090, () => {
  console.log('Proxy server is listening on port 8090');
});