import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DisplayBox from "./DisplayBox";
import SearchBox from "./SearchBox";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // Debounce helper function
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Function to fetch movies based on search or default popular movies
  const getMovies = async () => {
    let API = "";

    if (search.trim()) {
      // If search is not empty, use search API
      API = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=fcb017368c504ff65b95171c50029c8e&query=${search}`;
    } else {
      // If search is empty, show popular movies
      API = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=fcb017368c504ff65b95171c50029c8e";
    }

    try {
      const response = await axios.get(API);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setMovies([]); // Clear movies if an error occurs
    }
  };

 // Create a debounced version of getMovies that delays execution by 1000 ms 
// to limit API requests while the user types. The function is recreated 
// only when the 'search' dependency changes.
const debouncedFetchMovies = useCallback(debounce(getMovies, 1000), [search]);


  useEffect(() => {
    // Fetch default popular movies on initial render
    getMovies();
  }, []); // Empty dependency array means this runs only on mount

  useEffect(() => {
    // Fetch movies whenever the search term changes
    debouncedFetchMovies();
  }, [search, debouncedFetchMovies]);

  const movieSearchNameHandler = (value) => {
    setSearch(value);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="sticky-top bg-dark text-white py-4 shadow" style={{ zIndex: 1030 }}>
          <h1 className="text-center font-monospace">Hollymovies</h1>
          <SearchBox searchHandler={movieSearchNameHandler} />
        </div>

        <div className="mt-5 mx-3">
          {movies.length > 0 ? (
            <DisplayBox movies={movies} />
          ) : (
            <p className="text-center text-muted">Loading movies...</p> // Loading state instead of "No movies found"
          )}
        </div>
      </div>
    </>
  );
}

export default App;
