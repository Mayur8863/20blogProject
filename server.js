const http = require('http');
const express =require('express');
const app =express();
app.use(express.json()); 
const getConnection = require('./confiq/db');
getConnection();

const blogRoutes = require('./routes/blogRoute');
app.use("/blog",blogRoutes);

const server = http.createServer(app);
server.listen(3000,()=>{
    console.log('server started');
});