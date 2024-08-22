FROM node:22-alpine

WORKDIR /rampup

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
