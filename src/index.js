import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import routes from './routes';

const app = express();

// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


// mongodb setup
mongoose.connect(config.mongo_url+config.mongo_port);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log("Mongodb Database connected awesome !");});

// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

// Routing Middleware
app.use('/', routes);

// Run server on PORT
app.listen(config.port,()=>{
  console.log(`The app is now running in port ${config.port}`);
});
