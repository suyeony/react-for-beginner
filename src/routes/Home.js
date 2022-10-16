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
      //`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      `https://api.themoviedb.org/3/movie/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1`
    );
    const json = await response.json();
    //setMovies(json.data.movies);
    setMovies(json.results);
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
        <h1 className={styles.loadMsg}>Loading...</h1>
      ) : (
        <div>
          <h2 className={styles.category_name}>Popular</h2>
          <div className={styles.container}>
            {
              movies.map((movie) => (
                <div className={styles.movie_content}>
                  <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <img
                      className={styles.movie_content_img}
                      //src={movie.medium_cover_image}
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.name}
                    />
                  </Link>
                  <div className={styles.movie_content_title}>
                    {movie.title.length < 20
                      ? movie.title
                      : movie.title.slice(0, 20) + "..."}
                  </div>
                  <div className={styles.movie_content_year}>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : movie.release_date.slice(0, 4)}
                  </div>
                </div>
              ))
              /* {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))} */
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
