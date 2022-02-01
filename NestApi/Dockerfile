FROM node:16

LABEL version="1.0"
LABEL description="This is the base docker image for the Nest backend API."
LABEL maintainer = ["sipika.gusain7@gmail.com"]

# Create app directory
WORKDIR /samplenest-api

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 3890
CMD [ "npm", "run", "start" ]