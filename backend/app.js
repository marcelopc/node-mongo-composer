const express = require('express');
const restful = require('node-restful');
const bodyParser =  require('body-parser');
const cors = require('cors');

const server = express();
const mongoose = restful.mongoose;

//Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

const Client = restful.model('Client', {
    name: { type: String, required: true}
})

Client.methods(['get','post', 'put', 'delete']);
Client.updateOptions({new:true, runValidators: true});

Client.register(server, '/clients');


server.listen('3000');