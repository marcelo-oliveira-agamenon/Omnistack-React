const express = require('express');
const routes = require('./routes');
const mangoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

mangoose.connect('mongodb+srv://marcelo:marcelo@omnistack-pvnlc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

//GET, POST, PUT, DELETE
//req.query = acessar query params (para filtros)
//req.params = acessar route params (para edição, deletar)
//req.body = acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);