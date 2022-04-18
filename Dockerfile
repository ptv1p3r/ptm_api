# syntax=docker/dockerfile:1
FROM node:16.14.2

#ENV NODE_OPTIONS=--max-old-space-size=8096
# The working directory inside container
WORKDIR /.

# Get the package.json first to install dependencies
COPY package.json /.

# Install dependencies
RUN npm install
# building code for production
# RUN npm ci --only=production
#RUN echo "USE mysql;" > /docker-entrypoint-initdb.d/timezones.sql &&  mysql_tzinfo_to_sql /usr/share/zoneinfo >> /docker-entrypoint-initdb.d/timezones.sql

# Copy files
COPY . .

# Expose port
EXPOSE 5000

# Init command
#CMD [ "npm", "start"]
CMD [ "node", "server.js"]
