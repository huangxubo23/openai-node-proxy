FROM node:18-alpine

RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app
# 将 app 源代码复制到容器中
COPY . .

# 设置默认的 registry
RUN yarn config set registry 'https://registry.npmmirror.com/'
RUN yarn install

# 启动 app
CMD [ "npm", "run", "start" ]
# 暴露端口，与 app 中的端口一致
EXPOSE 8090