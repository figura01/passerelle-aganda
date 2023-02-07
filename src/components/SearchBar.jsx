const SearchBar = ({setFilter}) => {
  const handlerChangeInput = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }
  return (
    <div className="searchbar shadow-md rounded mb-4">
      <input type="search" className="cursor w-full px-4 py-4" placeholder="Filter par nom" onChange={(e) => handlerChangeInput(e) }/>
    </div>
  )
}
export default SearchBar;