const express = require("express");
const router = express.Router();
const {projects} = require("./data.json");
const path = require('path');

const app = express();

app.use("/static", express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(router);

router.get('/', (req, res, next) => {
    res.render('index', {projects});
  });

router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/project/:id', (req, res) => {
    const {id} = req.params;

    res.render("project", projects[id]);
});

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    console.log("Sorry, we couldn't find the webpage you were looking for :( Error code:", err.status);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(3000, () => {
    console.log("The app is running on localhost:3000!");
});