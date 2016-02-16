var express = require('express');
var router = express.Router();
var neo4j = require('node-neo4j');
var databaseUsername = 'neo4j';
var databasePassword = '01115192714';
var host = 'localhost';
var databasePort = '7474';
db = new neo4j('http://' + databaseUsername + ':' + databasePassword + '@' + host + ':'+ databasePort);

router.get('/getmovies', function(req, res, next) {
    //Run raw cypher with params
    db.cypherQuery(
        'MATCH (movie:Movie) RETURN movie LIMIT 10', function (err, movie) {
            if (err) {
                return console.log(err);
            }
            res.json(movie.data);
    });
});

router.post('/getmovieactor', function(req, res) {
    db.cypherQuery(
        'MATCH (actor:Person)-[role:ACTED_IN]->(movie:Movie) WHERE id(movie) = '+req.body.movieId+' RETURN actor, role.roles LIMIT 10', function (err, actor) {
            if (err) {
                return console.log(err);
            }
            var actors = [];
            for(var i=0; i<actor.data.length; i++){
                actors.push({actor: actor.data[i][0], roles: actor.data[i][1]})
            }
            res.json(actors);
    });
});

router.post('/getmoviedirector', function(req, res) {
    db.cypherQuery(
        'MATCH (director:Person)-[:DIRECTED]->(movie:Movie) WHERE id(movie) = '+req.body.movieId+' RETURN director LIMIT 10', function (err, director) {
            if (err) {
                return console.log(err);
            }
            res.json(director.data);
    });
});

router.post('/getmovieswithpersonid', function(req, res) {
    db.cypherQuery(
        'MATCH (person:Person)-[relation]->(movie:Movie) WHERE id(person) = '+req.body.personId+' RETURN movie, type(relation), relation.roles LIMIT 10', function (err, movie) {
            if (err) {
                return console.log(err);
            }
            var movieData = [];
            for(var i=0; i<movie.data.length; i++){
                movieData.push({movie:movie.data[i][0], relation: movie.data[i][1], roles: movie.data[i][2]})
            }
            res.json(movieData);
    });
});

router.post('/addnewdirector', function(req, res) {
    db.cypherQuery(
        'MERGE (person:Person {name: "'+ req.body.directorName +'"}) RETURN person', function (err, movie) {
            if (err) {
                return console.log(err);
            }
            db.cypherQuery(
                'MATCH (director:Person {name: "'+ req.body.directorName +'"}), (movie:Movie) WHERE id(movie) = '+req.body.movieId+' CREATE (director)-[:DIRECTED]->(movie)', function (err, director) {
                    if (err) {
                        return console.log(err);
                    }
                    db.cypherQuery(
                        'MATCH (director:Person)-[:DIRECTED]->(movie:Movie) WHERE id(movie) = '+req.body.movieId+' RETURN director LIMIT 10', function (err, director) {
                            if (err) {
                                return console.log(err);
                            }
                            res.json(director.data);
                    });
            });
    });
    
});

router.post('/removedirector', function(req, res) {
    db.cypherQuery(
        'MATCH (director:Person)-[rel:DIRECTED]->(movie:Movie) WHERE id(movie) = '+req.body.movieId+' AND id(director) = '+req.body.directorId+' DELETE rel', function (err, director) {
            if (err) {
                return console.log(err);
            }
            db.cypherQuery(
                'MATCH (director:Person)-[:DIRECTED]->(movie:Movie) WHERE id(movie) = '+req.body.movieId+' RETURN director', 
                function (err, director) {
                    if (err) {
                        return console.log(err);
                    }
                    res.json(director.data);
            });
    });
    
});

module.exports = router;