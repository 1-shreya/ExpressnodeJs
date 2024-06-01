// console.log("hiiii shreyaaaaa....;");


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cdac'
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sample')
  .then(() => console.log('Connected!'));
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name:"String",age:Number
})
const MyModel = mongoose.model('users',userSchema);

var express = require("express");
// console.log(typeof express)
var app = express();
// console.log(app);
app.get("/users", async function (req, res) {
  // res.send("Fetch data from MongoDb");
  try{
var ans=await MyModel.find()
res.send(ans)
  }catch(error){
res.send("Everything went wrong......")
  }
});
app.get("/mysqlusers",function(req,res){
  connection.query("select*from emp", 
  function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });

})

app.post("/users", function (req, res) {
  res.send("store data in MongoDb");
});
app.delete("/users", function (req, res) {
  res.send("delete data from MongoDb");
});
app.put("/users", function (req, res) {
  res.send("update data in MongoDb");
});

app.listen(9000);
