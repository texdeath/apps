FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "yarn.lock", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000