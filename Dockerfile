FROM node:latest

# Create app directory
WORKDIR /usr/src/graphql-react-upload-example

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Run tests
RUN npm test

EXPOSE 3000

CMD [ "npm", "start" ]
