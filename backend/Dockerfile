FROM node:18
# FROM node:20-alpine
# Tạo thư mục app
WORKDIR /usr/src/app

# Cài đặt thư viện
COPY package*.json ./
RUN npm install

# Mở cổng
EXPOSE 3000

# Lệnh chạy NestJS với hot reload
# CMD ["sh", "-c", "while :; do sleep 2073600; done"]
CMD ["npm", "run", "start:dev"]
