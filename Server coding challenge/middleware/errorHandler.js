const {Actor} = require('../models/actor-model');
const {Movie} = require('../models/movie-model');

function errorHandler(req, res, next) {
    let id = req.body.id;

    if(!id){
        res.statusMessage = "Id is missing in the body of the request";
        return res.statusCode(406).end();
    }

    let movieparam = req.params.movie_ID;

    if(movieparam != id){
        res.statusMessage = "id and movie_ID do not match";
        return res.statusCode(409).end();
    }

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if((!firstName) || (!lastName)){
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        return res.statusCode(403).end();
    }

    Movie
        .getMoviebyId(id)
        .then(res =>{
            if(res.ok){
                res.statusCode(201).json();
            }
            throw new Error("Error");
        })
        .then(responseJSON =>{
            if(responseJSON.length == 0){
                res.statusMessage = "The actor or movie do not exist";
                return res.statusCode(404).end();
            }
        })
        .catch(err=>{
            console.log(err);
        })

    Actor
        .getActorByName(firstName)
        .then(res =>{
            if(res.ok){
                res.statusCode(201).json();
            }
            throw new Error("Error");
        })
        .then(responseJSON =>{
            if(responseJSON.length == 0){
                res.statusMessage = "The actor or movie do not exist";
                return res.statusCode(404).end();
            }
        })
        .catch(err=>{
            console.log(err);
        })

    next();
}

module.exports = errorHandler;