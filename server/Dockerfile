FROM node:18.9.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]











# # Use Node.js base image
# FROM node:16

# # Set the working directory
# WORKDIR /assignment2-ravishankarbhange

# # Copy package.json and install dependencies
# COPY ./server/package.json ./server/
# RUN cd server && npm install

# # Rebuild bcrypt from source
# RUN cd server && npm rebuild bcrypt --build-from-source

# # Copy the server and build files
# COPY server ./server/
# COPY assignment2-ravishankarbhange/build ./server/public/

# # Expose port
# EXPOSE 5001

# # Run the server
# WORKDIR /assignment2-ravishankarbhange/server
# CMD ["npm", "start"]
