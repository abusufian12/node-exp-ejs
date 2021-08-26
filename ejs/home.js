var express = require('express');
var app = express();
const mongoose = require('mongoose')
const path = require('path');

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

const {addUser, register, allUser} = require('../controllers/userController')

app.set('views', './views');
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false }));
//get image
app.use( express.static( "public" ) );
//---------Routing Section----------
// router.post('/register', register)

//Users
// app.get("/users", (req, res) => {
//     var data = {name:'Akashdeep',
//     hobbies:['playing football', 'playing chess', 'cycling']}
//     res.render('user/index', {data:data});
// });
app.get("/users", allUser);
app.get("/users/add-user", addUser); 
app.get("/users/view-user", allUser); 

// app.use(express.json());
app.post("/users/register", register); 


//Posts
app.get("/posts", (req, res) => {
    var data = {name:'Akashdeep',
    hobbies:['playing football', 'playing chess', 'cycling']}
    
    res.render('posts', {data:data});
});

app.get("/about", (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      var tagline = "No programming concept is complete without a cute animal mascot.";
    
      res.render('about', {
        mascots: mascots,
        tagline: tagline
      });
});

app.get('/', (req, res)=>{
    //res.render('index');
    var data = {name:'Akashdeep',
        hobbies:['playing football', 'playing chess', 'cycling']}
     
    res.render('index', {data:data});
});


var server = app.listen(4000, function() {
    console.log('listening to port 4000')

    mongoose.connect('mongodb://localhost/blog',    
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
        console.log('Database Connected...')
    });

});


