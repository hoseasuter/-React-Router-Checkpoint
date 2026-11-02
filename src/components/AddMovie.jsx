import { useState, useEffect } from "react";

function AddMovie({ onAddMovie, editingMovie, onUpdateMovie, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        description: editingMovie.description,
        posterURL: editingMovie.posterURL,
        rating: String(editingMovie.rating),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        posterURL: "",
        rating: "",
      });
    }
  }, [editingMovie]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.posterURL.trim() ||
      formData.rating === ""
    ) {
      return;
    }

    const movieData = {
      ...formData,
      rating: Number(formData.rating),
    };

    if (editingMovie) {
      onUpdateMovie({
        ...movieData,
        id: editingMovie.id,
      });
    } else {
      onAddMovie(movieData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingMovie ? "Edit Movie" : "Add a New Movie"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Movie title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Movie description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="posterURL"
        placeholder="Poster image URL"
        value={formData.posterURL}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating (0-10)"
        min="0"
        max="10"
        step="0.1"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingMovie ? "Update Movie" : "Add Movie"}
      </button>

      {editingMovie && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default AddMovie;
