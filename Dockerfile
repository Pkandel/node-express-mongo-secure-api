#take default image of node
FROM node:7.10.0

MAINTAINER Prakash Kandel <unique_prakash2002@yahoo.com>

#create app directory in container
RUN mkdir -p /app

#set app directory as default working directory
WORKDIR /app

#copy all fies from current directory to /app container
COPY package.json /app

RUN npm install
RUN npm install pm2 -g

# copy rest of the project
COPY build /app

#expose port 4000 to outside world
EXPOSE 5000
 
#cmd to start 
CMD ["pm2", "start", "index.js"]
#CMD ["npm", "start"]