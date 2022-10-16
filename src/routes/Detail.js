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
    const json =
      await //await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=86e1929147898523c764072b1412eed4&language=en-US`
        )
      ).json();
    setMovie(json);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);

  const desc_more = () => {
    let descWindow = window.open(
      "about:blank",
      "hello",
      "height=300,width=500,top=50%,left=50%,margin=20px"
    );
    descWindow.document.write(
      `<div className=${styles.desc_more_screen}><h2>${movie.original_title}</h2><p>${movie.overview}</p></div>`
    );
  };
  return (
    <div>
      <Nav />
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.content}>
          <img
            className={styles.detail_image}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div className={styles.movie_section}>
            <h4 className={styles.movie_about}>About</h4>
            <div className={styles.movieInfo}>
              <h4 className={styles.title}>
                {/* {movie.original_title
                  ? movie.original_title
                  : movie.belongs_to_collection.name} */}
                {movie.title}({movie.release_date.slice(0, 4)})
              </h4>
              <ul className={styles.genre_list}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{`${genre.name} `}</li>
                ))}
              </ul>
              {movie.overview.length > 414 ? (
                <div>
                  <p className={styles.desc}>
                    {movie.overview.slice(0, 414)}...
                  </p>
                  <span
                    onClick={desc_more}
                    className={styles.desc_more}
                    type="button"
                  >
                    MORE
                  </span>
                </div>
              ) : (
                movie.overview
              )}
            </div>
            <hr></hr>
            <div className={styles.info_section_parent}>
              <div className={styles.info_section_child}>
                <h3 className={styles.category_title}>Information</h3>
                <p>Genre</p>
                <ul className={styles.genre_list}>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{`${genre.name} `} </li>
                  ))}
                </ul>
                <p>Released</p>
                <p className={styles.info_answer}>{movie.release_date}</p>
                <p>Region of Origin</p>
                <p className={styles.info_answer}>
                  {movie.production_countries[0].name}
                </p>
              </div>
              <div className={styles.info_section_child}>
                <h3 className={styles.category_title}>Language</h3>
                <p>Original Audio</p>
                <p className={styles.info_answer}>
                  {movie.spoken_languages[0].english_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
