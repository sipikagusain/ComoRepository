FROM node:16

LABEL version="1.0"
LABEL description="This is the base docker image for the React backend API."
LABEL maintainer = ["sipika.gusain7@gmail.com"]

EXPOSE 3000 

WORKDIR /app

COPY tsconfig.json /app/tsconfig.json 
COPY tslint.json /app/tslint.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
# Run 'npm run dev' when the container starts.
CMD ["npm", "run", "start"]