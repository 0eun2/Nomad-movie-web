import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Detail.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return <h1 className="loader">Loading...</h1>;
  }

  return (
    <div
      className="detail"
      style={{ backgroundImage: `url(${movie.background_image_original})` }}
    >
      <div className="detail__overlay">
        <h1 className="detail__title">{movie.title_long}</h1>
        <div className="detail__content">
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            className="detail__img"
          />
          <div className="detail__info">
            <p>
              <strong>⭐ Rating:</strong> {movie.rating} / 10
            </p>
            <p>
              <strong>🗓 Year:</strong> {movie.year}
            </p>
            <p>
              <strong>🎞 Genres:</strong> {movie.genres?.join(", ")}
            </p>
            <p>
              <strong>🕐 Runtime:</strong> {movie.runtime} minutes
            </p>
            <p className="detail__description">
              {movie.description_full || "No description available."}
            </p>
            {movie.yt_trailer_code && (
              <div className="detail__trailer">
                <a
                  href={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
