function Filter({ searchTerm, setSearchTerm, minRating, setMinRating }) {
  return (
    <div className="filter">
      {/* Filter by movie title */}
      <input
        type="text"
        placeholder="Search movies by title..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {/* Filter by movie rating */}
      <select
        value={minRating}
        onChange={(event) => setMinRating(Number(event.target.value))}
      >
        <option value="0">All ratings</option>
        <option value="7">7 stars and above</option>
        <option value="8">8 stars and above</option>
        <option value="9">9 stars and above</option>
      </select>
    </div>
  );
}

export default Filter;
