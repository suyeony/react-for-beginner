import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className={styles.content}>
      <img className={styles.content_img} src={coverImg} alt={title}></img>
      <h2>
        <Link key={id} to={`/movie/${id}`}>
          {title}
        </Link>
      </h2>
      <p>{summary.length > 300 ? summary.slice(0, 300) + "..." : summary}</p>
      <ul className={styles.genre_list}>
        {genres.map((genre) => (
          <li key={genre}>{"#" + genre} </li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
