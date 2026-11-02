import { useState, useEffect } from "react";

import MovieList from "../components/MovieList";
import Counter from "../components/Counter";
import AddMovie from "../components/AddMovie";
import Filter from "../components/Filter";

// Default movie data
const initialMovies = [
  {
    id: 1,
    title: "Inception",
    description: "A thief enters people's dreams to steal secrets.",
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    rating: 8.8,
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A team of explorers travels through a wormhole in space.",
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    rating: 8.7,
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "A battle between Batman and the Joker.",
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    rating: 9.1,
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
  },
];

function Home() {
  // Load saved movies from localStorage
  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = localStorage.getItem("movies");

      return savedMovies ? JSON.parse(savedMovies) : initialMovies;
    } catch {
      return initialMovies;
    }
  });

  // Save movies whenever the list changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Search and rating filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Movie currently being edited
  const [editingMovie, setEditingMovie] = useState(null);

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRating = movie.rating >= minRating;

    return matchesTitle && matchesRating;
  });

  // Add a new movie
  function handleAddMovie(newMovie) {
    setMovies((previousMovies) => [
      ...previousMovies,
      {
        ...newMovie,
        id: Date.now(),
      },
    ]);
  }

  // Select a movie for editing
  function handleEditMovie(id) {
    const movieToEdit = movies.find((movie) => movie.id === id);

    if (movieToEdit) {
      setEditingMovie(movieToEdit);
    }
  }

  // Update an existing movie
  function handleUpdateMovie(updatedMovie) {
    setMovies((previousMovies) =>
      previousMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    );

    setEditingMovie(null);
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingMovie(null);
  }

  return (
    <div className="app">
      <h1>My Movie App 🎬</h1>

      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      <AddMovie
        onAddMovie={handleAddMovie}
        editingMovie={editingMovie}
        onUpdateMovie={handleUpdateMovie}
        onCancelEdit={handleCancelEdit}
      />

      <MovieList movies={filteredMovies} onEditMovie={handleEditMovie} />

      <Counter />
    </div>
  );
}

export default Home;
