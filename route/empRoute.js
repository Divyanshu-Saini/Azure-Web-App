//importing package
const express = require('express');
const sql = require('mssql');
const uuid = require('uuid/v1');

//Initiallising connection string and router
const router = express.Router();
const dbConfig = {
    user: 'sa',
    password: 'sql@123',
    server: 'localhost',
    database: 'Db036',
    options:{
        encrypt:true
    }
};

//Function to connect to database and execute query
const executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            // create Request object
            const request = new sql.Request();
            // query to the database
            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
    // sql.close(dbConfig);
}


//Defining RestApi for employee Table
//GET API
router.get("/", function(req , res){
    console.log('hit');
    let query = "select * from [Employee]";
    executeQuery (res, query);
});

//POST API
router.post("/employee", function(req , res){
    console.log('data in body: ',req.body);
    let id = uuid();
    console.log("id",id);
    let query = "INSERT INTO [Employee] (ID,fname,lname,age,dob,address,isactive) VALUES (id,req.body.fname,req.body.lname,req.body.age,req.body.dob,req.body.address,resq.body.isactive)";
    executeQuery (res, query);
});

// //PUT API
// router.put("/api/user/:id", function(req , res){
//     let query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//     executeQuery (res, query);
// });

// // DELETE API
// router.delete("/api/user /:id", function(req , res){
//     let query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//     executeQuery (res, query);
// });

//exporting router
module.exports = router;