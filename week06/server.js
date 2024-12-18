const express = require('express');
const morgan = require('morgan');
require('./utils/ReturnResult');

let cardRouter = require('./routers/cardsRouter');

const app = express();
let port = process.env.port || 3000;

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use('/cards', cardRouter);


app.listen(port, () => {
    console.log(`address: http://localhost:${port}`);
});

module.exports = app;