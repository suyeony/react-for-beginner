import { useEffect, useState, useRef } from "react";
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
  const [input, setInput] = useState("");
  const pRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefualt();

    pRef.current.innerHTML = input;
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const lookUp = async () => {
    // const input = document.querySelector(".keyword").value;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=86e1929147898523c764072b1412eed4&language=en-US&query=${input}&page=1&include_adult=false`
    );
    const json = await response.json();

    console.log(input);
    console.log(json.results);
    setMovieResult(json.results);
    setLoading(false);
  };

  useEffect(() => {
    lookUp();
  }, []);

  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       lookUp();
  //     }
  //   };
  // }, []);

  library.add(faMagnifyingGlass);

  const imgHandleError = (e) => {
    console.log("image not found");
    e.target.src = notFound;
  };

  console.log(movieResult);

  return (
    <div>
      <Nav />
      <div className={styles.search_content}>
        <div className={styles.search_input}>
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                lookUp();
              }
            }}
            onSubmit={handleSubmit}
            onChange={handleChange}
            size="50"
            className="keyword"
            type="string"
            placeholder="Search"
          ></input>
          <span className={styles.underlined}></span>
          <span className={styles.search_button}>
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
        </div>
        {loading ? (
          <h1 className={styles.loadMsg}>Loading...</h1>
        ) : (
          <div className={styles.container}>
            {movieResult &&
              movieResult.map((movie) => (
                <div className={styles.search_result} key={movie.id}>
                  <img
                    onError={imgHandleError}
                    className={styles.search_img}
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
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
