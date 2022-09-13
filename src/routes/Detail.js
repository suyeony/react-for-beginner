import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h2>
            {movie.title}({movie.year})
          </h2>
          <h3>Genre</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
          <p>{movie.description_full}</p>
          <p>rating: {movie.rating}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
