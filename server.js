const express = require('express');
const path = require('path');

const app =express();

//serve only the static files dist directory

app.use(express.static('./dist/angular-app-heroku'));

app.get('/*',(req,res)=>
res.sendFile('index.html',{root:'dist/angular-app-heroku'}),
);

//start the app by listening on the default Heroku port

app.listen(process.env.PORT || 8080);