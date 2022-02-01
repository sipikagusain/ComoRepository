Steps to execute

----------------------To run Nest API-------------------------------------------------------------------------------
1. Open NestApi folder
2. Change the Database, username and password in the app.module.ts as per the db,username present in your postgres.
   
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres'

3. Execute "npm install" in the terminal
4. npm run start


---------------To run Scrapper module-------------------------------------------------------------------------------
PreReq : Make sure Nest API is running

1. Open Scrapper folder
2. Execute "npm install" in the terminal
3. Execute "node main.js" in the Terminal


----------------To run react application-------------------------------------------------------------------------
PreReq : Make sure Nest API is running

1. Open ReactApp folder
2. Execute "npm install" in the terminal
3. Execute "npm run start" in the terminal.

