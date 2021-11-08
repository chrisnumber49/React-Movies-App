import React from 'react';

//movie poster path
const IMAGE_API = "http://image.tmdb.org/t/p/w1280";

function Movie({title, poster_path, overview, vote_average}) {

    //change the score color depends on the vote_average
    const setColor = (vote_average) => {
        if(vote_average >= 8) {
            return "text-success";
        }else if(vote_average >= 6) {
            return "text-warning";
        }else {
            return "text-danger";
        }
    };

    return ( 
        <div className="card m-2 bg-info text-white rounded-lg shadow-lg position-relative" style={{width: '300px', overflow:'hidden'}}>
            <img 
                className="card-img-top" 
                //if movie poster losed, load alternative image
                src={
                        poster_path ? 
                        (IMAGE_API+poster_path): 
                        "https://i.pinimg.com/originals/e6/9c/b5/e69cb52941af06a751025eebb704be6b.jpg"
                    } 
                alt={title} 
            />
            
            <div className="card-body font-weight-bolder d-flex justify-content-between align-items-center">
                <h5>{title}</h5>
                
                <p className={`card-text ml-2 p-2 text-center bg-dark rounded-lg ${setColor(vote_average)}`}>
                    {vote_average}
                </p>
            </div>

            <div className="overview bg-white text-dark p-3 border border-dark mh-100">
                <h3 className="font-weight-bolder">Overview:</h3>
                <p>{overview}</p>
            </div>
        </div>
     );
}

export default Movie;