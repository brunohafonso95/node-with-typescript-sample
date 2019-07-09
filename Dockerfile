FROM node:alpine

WORKDIR /app

COPY package*.json .

COPY dist .

RUN npm i --production

EXPOSE 3000

CMD ["npm", "start"]