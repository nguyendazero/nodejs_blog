const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {

            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'oi oi-elevator', 
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending'
            };

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sort.type];
            const type = types[sort.type];

            return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
        </a>`

        }
    }
});

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// custom middlewares
app.use(SortMiddleware);


app.get('/middleware',
    function (req, res, next){
        if(['vethuong', 'vevip'].includes(req.query.ve)){
            req.face = 'gach gach gach!!';
            return next();
        }
        res.status(403).json({
             message: "Access denied"
        });
    },
    function (req, res, next){
        res.json({
            message: 'Successfully',
            face: req.face
        });
    }
);

//XMLHttpRequest, fetch, axios

// HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () =>
    console.log(`Ứng dụng đang lắng nghe tại http://localhost:${port}`),
);
