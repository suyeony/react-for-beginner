import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Nav from "../components/Nav";
import styles from "./Search.module.css";

function Search() {
  const [loading, setLoading] = useState(true);
  const [movieResult, setMovieResult] = useState([]);

  const lookUp = async () => {
    const input = document.querySelector(".keyword").value;
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?query_term=${input}`
    );
    const json = await response.json();
    console.log(input);

    setMovieResult(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    lookUp();
  }, []);

  console.log(movieResult);
  return (
    <div>
      <Nav />
      <div className={styles.search_input}>
        <input
          size="50"
          onChange={lookUp}
          className="keyword"
          type="string"
          placeholder="type something..."
        ></input>
        <span className={styles.underlined}></span>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          {movieResult &&
            movieResult.map((movie) => (
              <div key={movie.id}>
                <img src={movie.medium_cover_image} alt={movie.title}></img>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
