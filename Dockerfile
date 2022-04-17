# syntax=docker/dockerfile:1
FROM node:14

ENV NODE_OPTIONS=--max-old-space-size=8096

# The working directory inside container
WORKDIR /.

# Get the package.json first to install dependencies
COPY package.json /.

# Install dependencies
RUN npm install
# building code for production
# RUN npm ci --only=production

# Copy files
COPY . .

# Expose port
EXPOSE 5000

# Init command
#CMD [ "npm", "start"]
CMD [ "node", "server.js"]
