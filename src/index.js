const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
// Apply middle ware
// XMLHttpRequest, fetch, axios, ... thì sẽ submit theo kiểu khác
app.use(express.urlencoded({ extended: true })); // dùng cho form
            app.use(express.json());

// HTTP logger
    app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', "hbs");
app.set('views', path.join(__dirname, 'assets/views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
