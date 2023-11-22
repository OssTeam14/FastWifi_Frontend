import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 검색 결과를 상위 컴포넌트로 전달
    onSearch(searchTerm);
  };

  return (
    <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

      </div>
  );
}

export default Search;
