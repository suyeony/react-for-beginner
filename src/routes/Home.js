import { useEffect, useState, useRef } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const cont_ref = useRef(null);
  const container = document.querySelector(".container");
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=86e1929147898523c764072b1412eed4&language=en-US&page=1`
    );
    const json = await response.json();

    setMovies(json.results);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const leftScroll = (ref) => {
    ///const left = document.querySelector(".container");
    console.log(ref);
    ref.scrollBy(-1365, 0);
  };

  const rightScroll = (ref) => {
    // const right = document.querySelector(".container");
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
          <h2 className={styles.category_name}>Popular</h2>
          <div className={styles.container_wrap}>
            <button
              className={styles.leftArrow}
              onClick={() => {
                leftScroll(cont_ref.current);
              }}
            >
              &#60;
            </button>
            <div className={styles.container} ref={cont_ref}>
              {
                movies.map((movie) => (
                  <div className={styles.movie_content}>
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                      <img
                        className={styles.movie_content_img}
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        //src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
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
            <button
              className={styles.rightArrow}
              onClick={() => {
                rightScroll(cont_ref.current);
              }}
            >
              &#62;
            </button>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Home;
