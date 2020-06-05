const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Actor} = require('./models/actor-model');
const {Movie} = require('./models/movie-model');
const errorHandler = require('./middleware/errorHandler')

const app = express();

/* 
    Your code goes here 
*/

app.patch("/api/delete-movie-actor/:movie_ID",jsonParser,(req,res) =>{

    let id = req.body.id;
    let movieparam = req.params.movie_ID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    

    Actor
        .getActorByName({firstName,lastName})
        .then(resactor =>{
            if(res.ok){

                Movie
                .getMovieByID()
                .then(resmovie =>{
                    if(resmovie.ok){
                        Movie
                        .removeActorFromMovieList(resmovie,resactor)
                        .then(res =>{
                            if(res.ok){
                                return res.statusCode(201).json();
                            }
                            throw new Error("Error");
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                    }
                    throw new Error("Error");
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            throw new Error("Error");
        })
        .catch(err=>{
            console.log(err);
        })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});