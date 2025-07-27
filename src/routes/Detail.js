import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${movie.background_image_original})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          {movie.title_long}
        </h1>
        <div style={{ display: "flex", gap: "2rem" }}>
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            style={{ width: "300px", borderRadius: "10px" }}
          />
          <div style={{ flex: 1 }}>
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
            <p style={{ marginTop: "1rem" }}>
              {movie.description_full || "No description available."}
            </p>

            {movie.yt_trailer_code && (
              <div style={{ marginTop: "1.5rem" }}>
                <a
                  href={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00f", textDecoration: "underline" }}
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
