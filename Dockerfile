FROM node:alpine

WORKDIR /usr/src/app

#COPY package*.json ./
COPY ./ ./ 

RUN npm install
RUN npm run build

RUN ls -la

#COPY ./dist .

EXPOSE 3050

CMD ["npm", "start"]