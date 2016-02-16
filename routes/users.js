var express = require('express');
var router = express.Router();
var neo4j = require('node-neo4j');
var databaseUsername = 'neo4jUsername';
var databasePassword = 'neo4jPassword';
var host = 'localhost';
var databasePort = '7474';
var db = new neo4j('http://' + databaseUsername + ':' + databasePassword + '@' + host + ':'+ databasePort);

router.get('/getusers', function(req, res, next) {
    //Run raw cypher with params
    db.cypherQuery(
        'MATCH (user:User) RETURN user LIMIT 10', function (err, users) {
            if (err) {
                return console.log(err);
            }
            res.json(users.data);
    });
});

module.exports = router;