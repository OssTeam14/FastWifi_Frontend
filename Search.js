import React from 'react';

const Search = ({ getValue, setModalState }) => {
  return (
    <div className="title" id='border'>
      <div className='title_child' id='border'>
          LOGO
        </div>
      <div className='title_search'>
        <input className='search' onChange={getValue} />
        <img className='searchname' alt='search' src='img/search.svg' onClick={() => setModalState(true)} />
      </div>
      <img className='menubtn' alt='menu' src='img/menu.svg' />
    </div>
  );
}

export default Search;

//HEADER
