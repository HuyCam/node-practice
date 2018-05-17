const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('year', () => {
    return new Date().getFullYear();
})
app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        author: 'Huy'
    })
});

app.get('/help', (req, res) => {
    res.render('help.hbs'); 
})

app.listen(3000, () => console.log('App is up and running at port ' + port));