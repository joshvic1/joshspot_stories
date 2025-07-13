export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search anonymous stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
    </div>
  );
}
