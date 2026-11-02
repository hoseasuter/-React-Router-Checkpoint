import { useParams, useNavigate, useLocation } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if movie information was passed through navigation
  const passedMovie = location.state?.movie;

  // Retrieve saved movies from localStorage
  let savedMovies = [];

  try {
    savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");
  } catch {
    savedMovies = [];
  }

  // Find the movie using its ID
  const savedMovie = Array.isArray(savedMovies)
    ? savedMovies.find((movie) => String(movie.id) === id)
    : null;

  // Use navigation data first, then localStorage
  const movie = passedMovie || savedMovie;

  if (!movie) {
    return (
      <div className="movie-details">
        <h2>Movie details unavailable.</h2>

        <button onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <button onClick={() => navigate("/")}>← Back to Home</button>

      <h1>{movie.title}</h1>

      <img src={movie.posterURL} alt={movie.title} />

      <p>{movie.description}</p>

      <p>⭐ Rating: {movie.rating}/10</p>

      <h2>Movie Trailer 🎬</h2>

      <iframe
        width="560"
        height="315"
        src={movie.trailerURL}
        title={`${movie.title} trailer`}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieDetails;
