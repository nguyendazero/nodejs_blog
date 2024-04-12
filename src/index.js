const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').create({
    extname: '.hbs',
});

const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//XMLHttpRequest, fetch, axios

// HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () =>
    console.log(`Ứng dụng mẫu đang lắng nghe tại http://localhost:${port}`),
);
