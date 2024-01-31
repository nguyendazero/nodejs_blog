const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').create({
    extname: '.hbs'
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(port, () => console.log(`Ứng dụng mẫu đang lắng nghe tại http://localhost:${port}`))
