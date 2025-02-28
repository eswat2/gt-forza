FROM node:22

# Create app directory
WORKDIR /usr/src/bff

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8182
CMD [ "yarn", "dev" ]