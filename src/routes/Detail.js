import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import Nav from "../components/Nav";
import YouTube from "react-youtube";

function Detail() {
  //add loading
  // add json in state
  // fill out detail page
  // navigation bar
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState(false);
  const [casts, setCasts] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json =
      await //await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=86e1929147898523c764072b1412eed4&language=en-US&append_to_response=videos`
        )
      ).json();
    setMovie(json);
    setLoading(false);
    console.log(json);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const selectedTrailer = () => {
    console.log("button clicked");
    const trailer = movie.videos.results.find((video) =>
      video.name.includes("Official Trailer")
    );

    console.log(trailer);

    return (
      <YouTube
        videoId={trailer.key}
        iframeClassName={styles.movie_trailer}
        opts={{
          width: "100%",
          height: "801.56px",
          playerVars: {
            autoplay: 0,
            rel: 0,
            origin: window.location.host,
          },
        }}
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
    );
  };

  const getCast = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=86e1929147898523c764072b1412eed4&language=en-US`
      )
    ).json();

    console.log(json);
    setCasts(json.cast);
  };

  useEffect(() => {
    getCast();
  }, []);

  const desc_more = () => {
    let descWindow = window.open(
      "about:blank",
      "hello",
      "height=300,width=500,top=50%,left=50%,margin=20px"
    );
    descWindow.document.write(
      `<div className=${styles.desc_more_screen}><h2>${movie.title}</h2><p>${movie.overview}</p></div>`
    );
  };
  return (
    <div>
      <Nav />
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.content}>
          <div className={styles.poster_section}>
            <img
              className={styles.detail_image}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.original_title}
            />
            <div className={styles.movie_title}>{movie.title}</div>
            {movie.videos && trailer ? selectedTrailer() : null}
            <div className={styles.movie_poster_info}>
              <input
                onClick={() => setTrailer(true)}
                type="button"
                value="See the Trailer"
                className={styles.trailer_btn}
              />
              <div className={styles.movie_poster_desc}>{movie.overview}</div>
              {/* <span>
                Starring */}
              {/* <ul className={styles.cast_list}> */}
              {/* {casts.map((cast) => (
                    <li key={cast.id}>{`${cast.name} `} </li>
                  ))} */}
              <div className={styles.cast_list}>
                <span style={{ color: "#DEDCD9" }}>Starring</span>{" "}
                {casts[0].name}, {casts[1].name}, {casts[2].name},{" "}
                {casts[3].name}
              </div>
            </div>
          </div>
          <div className={styles.movie_section}>
            <h4 className={styles.movie_about}>About</h4>
            <div className={styles.movieInfo}>
              <h4 className={styles.title}>
                {movie.title}({movie.release_date.slice(0, 4)})
              </h4>
              <ul className={styles.genre_list}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{`${genre.name} `}</li>
                ))}
              </ul>
              {movie.overview.length > 300 ? (
                <div>
                  <p className={styles.desc}>
                    {movie.overview.slice(0, 300)}...
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
                <p>Run Time</p>
                <p className={styles.info_answer}>{movie.runtime} minutes</p>
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
