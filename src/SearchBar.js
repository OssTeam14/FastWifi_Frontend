import React, { useEffect, useState } from 'react';

const SearchBar = ({ getValue, setModalState, toggleMenu, loginstatus }) => {
    const GoHome = () => {
        window.location.replace("./")
    }

    const [islogin, setislogin] = useState(false);

    useEffect(() => {
        setislogin(loginstatus);
    }, [loginstatus]);

    return (
      <div className="title" id="border">
          <div className="col-2 d-flex align-self-center  justify-content-center" onClick={GoHome}>WIFI SPEED CHECK</div>
          <div className="col-8 d-flex align-self-center  justify-content-center">
              <input className='w-75 py-1 rounded' onChange={getValue} />
              <div className="p-2 material-symbols-outlined" onClick={() => setModalState(false)}>search</div>
          </div>

          {islogin && (
            <div className='islogin' onClick={toggleMenu}> LogIn </div>
          )}

          {!islogin && (
            <div id='tools' className='col-1 d-flex material-symbols-outlined' onClick={toggleMenu}>menu</div>
          )}
      </div>
    );
}
export default SearchBar;

