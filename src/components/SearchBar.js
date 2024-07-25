import {memo } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 200px;
    background-color: #ccc;
    border-radius: 10px;
    border: none;
    padding: 10px;
`;

const SearchBar = memo(({keyword, handleChange, placeholderText}) => {
    return <SearchInput value={keyword} key="search-bar" placeholder={placeholderText} onChange={handleChange}  type="number"/>
});

export default SearchBar;