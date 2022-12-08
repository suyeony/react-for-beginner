import { useEffect, useState, useRef } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  //popular category
  const [movies, setMovies] = useState([]);

  //top rated category
  const [topMovies, setTopMovies] = useState([]);
  const cont_ref_popular = useRef(null);
  const cont_ref_top = useRef(null);
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1`
    );
    const json = await response.json();

    setMovies(json.results);
    setLoading(false);
  };

  const getTopMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1`
    );
    const json = await response.json();

    setTopMovies(json.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getTopMovies();
  }, []);

  const leftScroll = (ref) => {
    console.log(ref);
    ref.scrollBy(-1365, 0);
  };

  const rightScroll = (ref) => {
    console.log(ref);
    ref.scrollBy(1365, 0);
  };

  // const searchMovies = async () => {
  //   const input = document.querySelector(".keyword").value;
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=86e1929147898523c764072b1412eed4&language=en-US&query=${input}&page=1&include_adult=false`
  //   );
  //   const json = await response.json();
  //   console.log(input);

  //   setMovies(json.results);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   searchMovies();
  // }, []);

  console.log(movies);

  return (
    <div>
      <Nav />
      {loading ? (
        <h1 className={styles.loadMsg}>Loading...</h1>
      ) : (
        <div>
          <div className={styles.container_main}>
            <h2 className={styles.category_name}>Popular</h2>
            <div className={styles.container_wrap}>
              <button
                className={styles.leftArrow}
                onClick={() => {
                  leftScroll(cont_ref_popular.current);
                }}
              >
                &#60;
              </button>
              <div className={styles.container} ref={cont_ref_popular}>
                {movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    backdrop_path={movie.backdrop_path}
                    release_date={movie.release_date}
                  />
                ))}
              </div>
              <button
                className={styles.rightArrow}
                onClick={() => {
                  rightScroll(cont_ref_popular.current);
                }}
              >
                &#62;
              </button>
            </div>
          </div>
          <div className={styles.category_main}>
            <h2 className={styles.category_name}>Top Rated</h2>
            <div className={styles.container_wrap}>
              <button
                className={styles.leftArrow}
                onClick={() => {
                  leftScroll(cont_ref_top.current);
                }}
              >
                &#60;
              </button>
              <div className={styles.container} ref={cont_ref_top}>
                {topMovies.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    backdrop_path={movie.backdrop_path}
                    release_date={movie.release_date}
                  />
                ))}
              </div>
              <button
                className={styles.rightArrow}
                onClick={() => {
                  rightScroll(cont_ref_top.current);
                }}
              >
                &#62;
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Home;
