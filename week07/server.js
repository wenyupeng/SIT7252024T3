const express = require('express');
const morgan = require('morgan');
require('./utils/ReturnResult');

const app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

let cardRouter = require('./routers/cardsRouter');


let port = process.env.port || 3000;

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use('/cards', cardRouter);

let msgArr = [
    'Hello',
    'Goodbye',
    'Welcome',
    'Good morning',
    'Good night'
];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        let index = Math.floor(Math.random() * msgArr.length);
        socket.emit('message', msgArr[index]);
    }, 100000);

});

http.listen(port, () => {
    console.log(`address: http://localhost:${port}`);
});

module.exports = http;