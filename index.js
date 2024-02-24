// app
const express = require("express");
const app = express();

// databases
const sequelize = require("./db/db");
const data = require("./db/data");

// cookie-session
const cookieParser = require("cookie-parser");
const session = require('express-session');

// template engine
app.set("view engine","ejs");

// path
const path = require("path");

// static/public
app.use("/static", express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended : true}));

// session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// cookie parser
app.use(cookieParser());

// express session
app.use(session({
    secret: 'abcdyzi',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge : 1000 * 60 * 60 * 24
    },
    store : new SequelizeStore({
        db : sequelize
    })
}));

// csrf
const csurf = require("csurf");
app.use(csurf());


// locals Middleware
const locals = require("./middlewares/locals");
app.use(locals);

// Routes 
const authRoutes = require("./routes/auth");
app.use(authRoutes);

// Models & Relations
const relations = require("./relations");
relations();

// sync database
(async () => { 
    await sequelize.sync({force : true});
    await data();
})();

// listen port
const port = 3000;
app.listen(port,() => {
    console.log(`App listening on port ${port}`)
})