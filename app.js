const express = require("express");
const router = express.Router();
const {projects} = require("./data.json");
const path = require('path');

const app = express();

app.use("/static", express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(router);

// ROUTES
// Index
router.get('/', (req, res, next) => {
    // Passed in data is used for creating and displaying project links and info
    res.render('index', {projects});
  });

// About
router.get('/about', (req, res, next) => {
    res.render('about');
});

// Global error handler function
function notFoundHandler(next) {
    const err = new Error("Not Found");
    err.status = 404;
    // Logs error to the console
    console.log("Sorry, we couldn't find the webpage you were looking for :( Error code:", err.status);
    next(err);
}

// Projects
router.get('/project/:id', (req, res, next) => {
    // Store request project page id value...
    const {id} = req.params;

    if (id && id < projects.length) {
       // ...and use it to pass the corresponding project object information for the template to display
       res.render("project", projects[id]); 
    }
    else {
        // If project id doesn't exist, show 404 error page
        notFoundHandler(next);
    }
});

// ERROR HANDLING
// Non-existent path request creates a 404 error
app.use((req, res, next) => {
    notFoundHandler(next);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    // Uses custom error template for user-friendly error display
    res.render("error");
});

app.listen(3000, () => {
    console.log("The app is running on localhost:3000!");
});