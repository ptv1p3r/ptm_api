# syntax=docker/dockerfile:1
FROM node:14

# The working directory inside container
WORKDIR /.

# Get the package.json first to install dependencies
COPY package.json /.

# This will install dependencies
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start"]
