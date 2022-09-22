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

  const desc_more = () => {
    let descWindow = window.open(
      "about:blank",
      "hello",
      "height=300,width=500,top=50%,left=50%,margin=20px"
    );
    descWindow.document.write(
      `<div className=${styles.desc_more_screen}><h2>${movie.title}</h2><p>${movie.description_full}</p></div>`
    );
  };
  return (
    <div>
      <Nav />
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.content}>
          <img src={movie.large_cover_image} alt={movie.title} />
          <div className={styles.movie_section}>
            <h4 className={styles.category_title}>About</h4>
            <div className={styles.movieInfo}>
              <h4 className={styles.title}>
                {movie.title}({movie.year})
              </h4>
              <ul className={styles.genre_list}>
                {movie.genres.map((genre) => (
                  <li key={genre}>{`${genre} `}</li>
                ))}
              </ul>
              <p className={styles.desc}>
                {movie.description_full.length > 414
                  ? movie.description_full.slice(0, 414) + "..."
                  : movie.description_full}
                {/* {document.querySelector(".desc_more").className()} */}
              </p>
              <span
                onClick={desc_more}
                className={styles.desc_more}
                type="button"
              >
                MORE
              </span>
            </div>
            <hr></hr>
            <div>
              <h4 className={styles.category_title}>Information</h4>
              <div className={styles.info_section}>
                <p>Genre</p>
                <ul className={styles.genre_list}>
                  {movie.genres.map((genre) => (
                    <li key={genre}>{genre + " "} </li>
                  ))}
                </ul>
                <p>Released</p>
                <p className={styles.year}>{movie.year}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
