import React from 'react';

const SearchBar = ({ getValue, setModalState, toggleMenu }) => {
  return (
      <div className="title" id="border">
          <div className="col-2 d-flex align-self-center  justify-content-center">WIFI SPEED CHECK</div>
          <div className="col-8 d-flex align-self-center  justify-content-center">
              <input className='w-75 py-1 rounded' onChange={getValue} />
              <div className="p-2 material-symbols-outlined" onClick={() => setModalState(false)}>search</div>
          </div>
          <img className='menubtn' alt='menu' src='img/menu.svg' onClick={toggleMenu}/>
      </div>
/*    <div className="title" id='border'>

      <div className='title_search'>

      </div>
      
    </div>*/
    
  );
}
export default SearchBar;