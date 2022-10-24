import styles from "./Nav.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Home from "../routes/Home.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  // const [results, setResults] = useState([]);
  library.add(faMagnifyingGlass);

  // const searchMovies = async () => {
  //   const input = document.querySelector(".keyword").value;
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=86e1929147898523c764072b1412eed4&language=en-US&query=${input}&page=1&include_adult=false`
  //   );
  //   const json = await response.json();
  //   console.log(input);

  //   setResults(json.results);

  //   Home.setMovies(results);
  // };

  // useEffect(() => {
  //   searchMovies();
  // }, []);

  return (
    <nav>
      <ul className={styles.nav_ul}>
        <li className={styles.nav_list}>
          <Link to={process.env.PUBLIC_URL + "/"}>Movies</Link>
        </li>
        <li className={styles.nav_list}>
          <Link to="/search">Search</Link>
        </li>
        <div className={styles.search_input}>
          <input
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     searchMovies();
            //   }
            // }}
            size="15"
            className="keyword"
            type="string"
            placeholder="Search"
            // value={keyword}
          ></input>
          <span className={styles.search_button}>
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
        </div>
      </ul>
    </nav>
  );
}

// Nav.propTypes = {
//   keyword: PropTypes.string,
//   //genres: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default Nav;
