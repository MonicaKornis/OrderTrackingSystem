const SearchBar = ({keyword, handleChange, placeholderText}) => {
    return <input value={keyword} key="search-bar" placeholder={placeholderText} onChange={handleChange}  type="number"/>
};

export default SearchBar;