FROM node:16

WORKDIR /app

#COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install


#Solve the problem reinstaling bcrypt
RUN npm uninstall bcrypt
RUN npm i bcrypt


CMD [ "npm", "run", "start" ]
