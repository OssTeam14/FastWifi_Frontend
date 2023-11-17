import React, { useEffect, useRef } from 'react';

//NaverMap 에서 API를 받아오는 함수, 초기화값: 광운대학교
const Map = ({ mapContainer }) => {
  useEffect(() => {
    const { naver } = window;

    if (naver && naver.maps) {
      const location = new naver.maps.LatLng(37.61959073843791, 127.06028256642908);
      const options = {
        center: location,
        zoom: 19
      };

      new naver.maps.Map(mapContainer.current, options);
    }
  }, []);

  return (
    <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh' }}>
      {/* The map will be rendered here */}
    </div>
  );
}

export default Map;
