import { Link } from "react-router-dom";

function MovieCard({
  id,
  title,
  description,
  posterURL,
  rating,
  trailerURL,
  onEdit,
}) {
  const movie = {
    id,
    title,
    description,
    posterURL,
    rating,
    trailerURL,
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`} state={{ movie }}>
        <img src={posterURL} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <p>⭐ Rating: {rating}/10</p>
      </Link>

      <button onClick={() => onEdit(id)}>Edit Movie</button>
    </div>
  );
}

export default MovieCard;
