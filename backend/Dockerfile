FROM node:18

# Tạo thư mục app
WORKDIR /usr/src/app

# Cài đặt thư viện
COPY package*.json ./
RUN npm install

# Mở cổng
EXPOSE 3000

# Lệnh chạy NestJS với hot reload
CMD ["npm", "run", "start:dev"]
