var express = require('express');
var app = express();

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.use(express.static('public')); // only native middle, also only works if run node from backendServer directory
app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
  console.log('Listening on port 3000.');
});
