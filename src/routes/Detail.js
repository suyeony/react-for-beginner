import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import Nav from "../components/Nav";

function Detail() {
  //add loading
  // add json in state
  // fill out detail page
  // navigation bar
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <Nav className={styles.nav} />
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.content}>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <div className={styles.movieInfo}>
            <h2>
              {movie.title}({movie.year})
            </h2>
            <ul className={styles.genre_list}>
              {movie.genres.map((genre) => (
                <li key={genre}>#{genre}</li>
              ))}
            </ul>
            <p>{movie.description_full}</p>
            <p>⭐️{movie.rating}/10</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
