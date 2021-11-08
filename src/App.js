import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';

// this Movies app is using The Movie Database (TMDB) API (https://developers.themoviedb.org/3)

//API URL from the movie database
const FETCH_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
//API URL for serching
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  //movie and search state
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  //fetch movies after mounted
  useEffect(() => {
    fetchMovies(FETCH_API);
  }, []);

  //function for fetch the API url
  const fetchMovies = (URL) =>{
    fetch(URL)
              .then(res=>res.json())
              .then((json) => {
                setMovies(json.results);
              });
  };

  //if serching something, fetch with SEARCH_API + search term otherwise fetch with FETCH_API
  const searchMovie = (e) =>{
    e.preventDefault();

    if(search) {
      fetchMovies(SEARCH_API+search);
      setSearch('');
    }else{
      fetchMovies(FETCH_API);
    }
  };

  return (
    <div>
      <header className="px-5 py-2 mb-2 d-flex flex-wrap justify-content-between" style={{backgroundColor: 'rgb(52, 215, 236)'}}>
        {/* back to home page (FETCH_API) */}
        <button className="btn btn-info" onClick={()=>fetchMovies(FETCH_API)}>
          <i className="material-icons" >home</i>
        </button>

        {/* search input */}
        <form onSubmit={searchMovie}>
          <input 
            className="p-2 border border-dark rounded-pill bg-transparent" 
            type="text" 
            placeholder="Find Movies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </header>

      {/* render all of movies */}
      <div className="d-flex flex-wrap justify-content-around">
        {movies.length > 0 && movies.map((movie) => {
          return <Movie key={movie.id} {...movie} />
        })}
      </div>
    </div>
  );
}

export default App;
