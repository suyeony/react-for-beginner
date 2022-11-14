import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import notFound from "./image_not_found.png";
function Movie({ id, title, backdrop_path, release_date }) {
  const imgHandleError = (e) => {
    console.log("image not found");
    e.target.src = notFound;
  };
  return (
    <div className={styles.movie_content}>
      <Link key={id} to={`/movie/${id}`}>
        <img
          className={styles.movie_content_img}
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={title}
        />
      </Link>
      <div className={styles.movie_content_title}>
        {title.length < 20 ? title : title.slice(0, 20) + "..."}
      </div>
      <div className={styles.movie_content_year}>
        {release_date ? release_date.slice(0, 4) : release_date.slice(0, 4)}
      </div>
    </div>
  );
  // <div className={styles.content}>
  //   <img
  //     onError={imgHandleError}
  //     className={styles.content_img}
  //     src={coverImg}
  //     alt={title}
  //   ></img>
  //   <h2>
  //     <Link key={id} to={`/movie/${id}`}>
  //       {title}
  //     </Link>
  //   </h2>
  //   <p className={styles.summary}>
  //     {summary.length > 300
  //       ? summary.slice(0, 300) + "..."
  //       : summary.length === 0
  //       ? "no summary"
  //       : summary}
  //   </p>
  //   <ul className={styles.genre_list}>
  //     {genres.map((genre) => (
  //       <li key={genre}>{"#" + genre} </li>
  //     ))}
  //   </ul>
  // </div>
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  backdrop_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
};

export default Movie;
