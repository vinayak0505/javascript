const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

var contactList = [
    {
        name: "asdf",
        phone: "23232323"
    },
    {
        name: "asdf",
        phone: "23232323"
    },
    {
        name: "asdf",
        phone: "23232323"
    }
];

app.get('/', function (req, res) {
    return res.render('home', {
        title: "test12",
        contact_list: contactList
    });
})

app.post('/create-contact',function (req,res) {
    console.log(req.body);
    contactList.push(req.body);
    return res.redirect('back');
});

app.listen(port, function (err) {
    if (err) {
        console.log('error while running the server', err);
        return;
    }
    console.log('running on port number', port);
})