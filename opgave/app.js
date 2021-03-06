/**
 * Created by Fran on 17/12/2018.
 */
/*
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/')));

app.use("/javascript", express.static(__dirname + '/javascript'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/images", express.static(__dirname + '/images'));
// Defining the port number.
// It is important to set to process.env.PORT
// since Lambda will define the PORT explicitly
const PORT = process.env.PORT || 5000;

// Supporting every type of body content type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use below codes to automatically add your routing files (endpoints)


app.get('/home', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

var routes = fs.readdirSync(path.join(__dirname, '/route'));
routes.forEach(routesFile => {
    if (routesFile.match(/\.js$/)) {
    var route = require(path.join(__dirname, '/route/', routesFile));
    route(app)
}
})


// show the running port on console
app.listen(PORT, function() {
    console.log('server started on port ', PORT)
});