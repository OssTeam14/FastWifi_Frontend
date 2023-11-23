import React from 'react';

const SearchBar = ({ getValue, setModalState, toggleMenu }) => {
    const GoHome = () => {
        window.location.replace("./")
    }
  return (
      <div className="title" id="border">
          <div className="col-2 d-flex align-self-center  justify-content-center" onClick={GoHome}>WIFI SPEED CHECK</div>
          <div className="col-8 d-flex align-self-center  justify-content-center">
              <input className='w-75 py-1 rounded' onChange={getValue} />
              <div className="p-2 material-symbols-outlined" onClick={() => setModalState(false)}>search</div>
          </div>
          <div id='tools' className='p-2 material-symbols-outlined' onClick={toggleMenu}>menu</div>
      </div>
  );
}
export default SearchBar;

