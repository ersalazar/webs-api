import e, { NextFunction, Request, Response } from "express";
const express = require('express');

const app = express();

app.use(function (req: Request, res: Response, next: NextFunction) {
    // Allowed to connect websites
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Allowed request methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Allowed request headers
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, auth-token');

    // Allow sessions
    res.setHeader('Acces-Control-Allow-Credentials', 'true');

    next()
});


const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Connected to mongoDB Atlas!'))
    .catch((error: any) => console.log(error));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoder({limit: '50mb', extended: true}))

