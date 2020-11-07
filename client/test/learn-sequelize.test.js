const { Genre, Actor, Movie } = require('./models');


//look into aysnc await way of doing this

/*
  currently, the genre table only has 3 entries: Action, Comedy, and Drama
  Add one more Genre of your choice.
*/
function insertNewGenre() {

  // const NewGenre = Genre.create({name : "Romance"});
  // NewGenre.save();
  // let g = Genre.build();
  // g.name = "Romance";
  // return g.save; 
  // create is a combo of build and save
  return Genre.create({name : "Romance"});

}

/*
  currently, there are 5 movies
  Add one more Movie of your choice. But it CANNOT be from 2008.
*/
function insertNewMovie() {
  return Movie.create({title: "Inception", year: 2009})
}

/*
  Return the title of the movie with ID=2
*/
function getMovieWithId2() {
  return Movie
  // multiple ways
  // .findByPk(2)
  .findOne({where: {id: 2}})
  
  .then(movie => {
    // return movie.title;// this way gives you raw data
    return movie.get('title'); // this way is proably better


  });
  
}

/*
  Return an array of all the actor names
*/
function getAllActors() {
  // const ActorFinder = Actor.findAll({ attributes: ['name'] })
  // .map(obj => obj.name);
  // return ActorFinder;

  // or

  return  Actor.findAll({attributes: ["name"] }).then(actors => {
    // return actors;
    //or
    return actors.map(arg => arg.name);
  });
}

/*
  Return an array of all the movie names from 2008
*/
function getAllMoviesFrom2008() {
  return Movie
    .findAll({ where: {year: 2008}})
    .then((movies) =>{
      return movies.map((m)=> m.title);
    } );
}

/*
  Delete the genre you added in the first test
*/
function deleteGenreYouAdded() {

  return  Genre 
  .findOne({ where: {name: "Romance"}})
  .then((g) => {
    return g.destroy();
  });

}

/*
  Rosario Dawson acted in the movie Eagle Eye.
  Add this association.
*/
function associateRosarioToEagleEye() {
  //  let moviePromise = Movie.findOne({where: {title: "Eagle Eye"}});
   let moviePromise = Movie.findByPk(4);
   let actorPromise = Actor.findOne({where: {name: "Rosario Dawson"}});

   return  Promise
   .all([moviePromise, actorPromise])
  .then(([movieResult, actorResult]) => {

    // return movieResult.addActor(actorResult);
    return actorResult.addMovie(movieResult); // also valid
  })
  }

/*
  Robert Downey Jr. acted in the movie Tropic Thunder.
  Add this association.
*/
function associateRobertToTropicThunder() {

  return Actor.findOne({where: {name: "Robert Downey Jr."}})
  .then(robert => {
    return Movie.findOne({where: {title:"Tropic Thunder"}})
    .then(movie => {
      return movie.addActor(robert);
    })
  })


}

module.exports = {
  insertNewGenre,
  insertNewMovie,
  getMovieWithId2,
  getAllActors,
  getAllMoviesFrom2008,
  deleteGenreYouAdded,
  associateRosarioToEagleEye,
  associateRobertToTropicThunder,
};
