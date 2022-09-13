import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

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
      <nav>
        <a href={process.env.PUBLIC_URL + "/"}>Movies</a>
        <a href="/search">Search</a>
      </nav>
      <input onChange={lookUp} className="keyword" type="string"></input>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          {movieResult &&
            movieResult.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
