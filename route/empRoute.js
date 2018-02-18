//importing package
const express = require('express');
const sql = require('mssql');

//Initiallising connection string and router
const router = express.Router();
const dbConfig = {
    user: 'sa',
    password: 'sql@123',
    server: 'localhost',
    database: 'Db036'
};

//Function to connect to database and execute query
const executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.json(err);
        }
        else {
            // create Request object
            const request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.json(err);
                }
                else {
                    res.json(res);
                }
            });
        }
    });
}


//Defining RestApi for employee Table
//GET API
router.get("/employee", function(req , res){
    let query = "select * from [EmployeeData]";
    executeQuery (res, query);
});

//POST API
router.post("/api/user", function(req , res){
    let query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
    executeQuery (res, query);
});

//PUT API
router.put("/api/user/:id", function(req , res){
    let query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
    executeQuery (res, query);
});

// DELETE API
router.delete("/api/user /:id", function(req , res){
    let query = "DELETE FROM [user] WHERE Id=" + req.params.id;
    executeQuery (res, query);
});

//exporting router
module.exports = router;