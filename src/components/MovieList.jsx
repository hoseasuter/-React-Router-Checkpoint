import MovieCard from "./MovieCard";

function MovieList({ movies, onEditMovie }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          description={movie.description}
          posterURL={movie.posterURL}
          rating={movie.rating}
          trailerURL={movie.trailerURL}
          onEdit={onEditMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
