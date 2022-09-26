import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import notFound from "../components/image_not_found.png";

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

  library.add(faMagnifyingGlass);

  const imgHandleError = (e) => {
    console.log("image not found so another image replaced");
    e.target.src = notFound;
  };

  console.log(movieResult);
  return (
    <div>
      <Nav />
      <div className={styles.search_content}>
        <div className={styles.search_input}>
          <input
            size="50"
            onChange={lookUp}
            className="keyword"
            type="string"
            placeholder="Search"
          ></input>
          <span className={styles.underlined}></span>
          <span onSubmit={lookUp} className={styles.search_button}>
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className={styles.container}>
            {movieResult &&
              movieResult.map((movie) => (
                <div className={styles.search_result} key={movie.id}>
                  <img
                    onError={imgHandleError}
                    className={styles.search_img}
                    src={movie.medium_cover_image}
                    alt={movie.title}
                  ></img>
                  <div className={styles.search_info}>
                    <div className={styles.search_title}>
                      <Link
                        className={styles.search_title_a}
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                      >
                        {movie.title}
                      </Link>
                    </div>
                    <div className={styles.search_rating}>
                      ⭐️ {movie.rating}/10
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
