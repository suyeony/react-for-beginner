import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);

  return (
    <div>
      <Nav />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          {movies.map((movie) => (
            <div className={styles.movie_content}>
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <img
                  className={styles.movie_content_img}
                  src={movie.medium_cover_image}
                  alt={movie.title}
                />
              </Link>
              <div className={styles.movie_content_title}>
                {movie.title.length < 20
                  ? movie.title
                  : movie.title.slice(0, 20) + "..."}
              </div>
              <div className={styles.movie_content_year}>{movie.year}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
