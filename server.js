const express = require('express');
const app = express();
const Dogs = require('./models/dogsData');
const methodOverridde = require('method-override')
const bodyParser = require('body-parser')

// Middleware
app.use(methodOverridde('_method'));
app.use(bodyParser.urlencoded({ extended: false }))



// Index Route
app.get('/dogs', (req, res) => {
    res.render('index.ejs', {
        dogsList: Dogs
    })
});

// Show Route
app.get('/dogs/:id', (req, res) => {
    res.render('show.ejs', {
        dogsShow: Dogs[req.params.id],
        index: req.params.id,
    })
})

//Edit Route
app.get('/dogs/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        dogsEdit: Dogs[req.params.id],
        index: req.params.id
    })
    console.log(req.body)
})
// Part of the edit route
app.put('/dogs/:id', (req, res) => {
    Dogs[req.params.id] = req.body;
    res.redirect('/dogs')
})


// Delete Route
app.delete('/dogs/:id', (req, res) => {
    Dogs.splice(req.params.id, 1);
    res.redirect('/dogs')
})










app.listen(3000, () => {
    console.log('Dog Server is running on port 3000');
})