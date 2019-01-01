const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials',null);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    res.render("maintanance.hbs",{
        pageTitle: "Maintannce mode on",
        currentYear: new Date().getFullYear(),
    })
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    })
    console.log(log);
    next();
});

app.get('/', ( req, res ) => {
    res.send("Hello Express")
});

app.get('/help', ( req, res ) => {
    res.render("help.hbs",{
        pageTitle: "Help Page",
        currentYear: new Date().getFullYear(),
    })
});

app.get('/about', ( req, res ) => {
    res.render("about.hbs",{
        pageTitle: "About Page",
        currentYear: new Date().getFullYear(),
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});