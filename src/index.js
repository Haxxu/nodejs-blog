const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

 const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// Apply middle ware
// XMLHttpRequest, fetch, axios, ... thì sẽ submit theo kiểu khác
app.use(express.urlencoded({ extended: true })); // dùng cho form
app.use(express.json());

// Method Overide
app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (fieldName, sort) => {
                const sortType = fieldName === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a href="?_sort&column=${fieldName}&type=${type}">
                        <span class="${icon}"></span>
                    </a>
                `;
            }
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'assets', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
