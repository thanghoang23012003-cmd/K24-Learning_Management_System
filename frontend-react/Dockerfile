FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g vite


EXPOSE 5000

CMD ["npm", "run", "dev"]
