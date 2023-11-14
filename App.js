import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [inputword, setWord] = useState("");
  const mapContainer = useRef(null);
  let today = '2023-10-30';

  useEffect(() => {
    const { naver } = window;

    if (naver && naver.maps) {
      const location = new naver.maps.LatLng(37.61959083843791, 127.06028256642908);
      const options = {
        center: location,
        zoom: 19
      };

      new naver.maps.Map(mapContainer.current, options);
    }
  }, []);

  return (
    <div className="App">
      <div className="title" id='border'> 
        <div className='title_child' id='border'>
          LOGO
        </div>

        <div className='title_search'>        
          <input className='search' 
            value={inputword}
            onChange={(e) => setWord(e.target.value)}
          />
          <img className='searchname' alt='search' src='img/search.svg' />
        </div>
        
        <img className='menubtn' alt='menu' src='img/menu.svg' />
      </div>  
      <div className="main_container" id='border'>
        <div className='main_list' id='border'>
          LIST
        </div>
        <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh' }}>
          {/* The map will be rendered here */}
        </div>
        <div className='main_menu' id='border'>
          RIGHT
        </div>
      </div>
      <h4>{ today }</h4>
    </div>
  );
}

export default App;