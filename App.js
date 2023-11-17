import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [inputWord, setWord] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState({ title: '', content: '' });
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const circleRef = useRef(null);
  const userLocationMarkerRef = useRef(null);

  // 인포윈도우 콘텐츠 생성 함수
  const createInfoWindowContent = () => {
    return `
      <div class="info-window" style="width: 200px; padding: 10px;">
        <h4>${detailInfo.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('항목 1')">항목 1</button></li>
          <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
          <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
        </ul>
        ${detailInfo.content ? `<p>${detailInfo.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };

  // 세부 정보를 업데이트하는 함수
  const updateDetailInfo = (item) => {
    const details = {
      '항목 1': { title: '항목 1', content: '세부정보 1' },
      '항목 2': { title: '항목 2', content: '세부정보 2' },
      '항목 3': { title: '항목 3', content: '세부정보 3' },
    };
    setDetailInfo(details[item]);
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(createInfoWindowContent(details[item]));
    }
  };

  // 인포윈도우를 닫는 함수
  const closeInfoWindow = () => {
    setDetailInfo({ title: '', content: '' }); // 상태를 초기화합니다.
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      const initialLocation = new window.naver.maps.LatLng(37.619117926932844, 127.06007263550102);
      const options = {
        center: initialLocation,
        zoom: 19
      };

      mapRef.current = new window.naver.maps.Map(mapContainer.current, options);

      const specificLocation = new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389);
      const marker = new window.naver.maps.Marker({
        position: specificLocation,
        map: mapRef.current
      });import React, { useState, useEffect, useRef } from 'react';
      import './App.css';
      
      function App() {
        const [inputWord, setWord] = useState("");
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [detailInfo, setDetailInfo] = useState({ title: '', content: '' });
        const mapContainer = useRef(null);
        const mapRef = useRef(null);
        const infoWindowRef = useRef(null);
        const circleRef = useRef(null);
        const userLocationMarkerRef = useRef(null);
      
        // 인포윈도우 콘텐츠 생성 함수
        const createInfoWindowContent = () => {
          return `
            <div class="info-window" style="width: 200px; padding: 10px;">
              <h4>${detailInfo.title || '리스트 제목'}</h4>
              <ul>
                <li><button onclick="window.updateDetailInfo('항목 1')">항목 1</button></li>
                <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
                <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
              </ul>
              ${detailInfo.content ? `<p>${detailInfo.content}</p>` : ''}
              <button onclick="window.closeInfoWindow()">닫기</button>
            </div>
          `;
        };
      
        // 세부 정보를 업데이트하는 함수
        const updateDetailInfo = (item) => {
          const details = {
            '항목 1': { title: '항목 1', content: '세부정보 1' },
            '항목 2': { title: '항목 2', content: '세부정보 2' },
            '항목 3': { title: '항목 3', content: '세부정보 3' },
          };
          setDetailInfo(details[item]);
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(createInfoWindowContent(details[item]));
          }
        };
      
        // 인포윈도우를 닫는 함수
        const closeInfoWindow = () => {
          setDetailInfo({ title: '', content: '' }); // 상태를 초기화합니다.
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
        };
      
        useEffect(() => {
          if (window.naver && window.naver.maps) {
            const initialLocation = new window.naver.maps.LatLng(37.619117926932844, 127.06007263550102);
            const options = {
              center: initialLocation,
              zoom: 19
            };
      
            mapRef.current = new window.naver.maps.Map(mapContainer.current, options);
      
            const specificLocation = new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389);
            const marker = new window.naver.maps.Marker({
              position: specificLocation,
              map: mapRef.current
            });
      
            infoWindowRef.current = new window.naver.maps.InfoWindow({
              content: createInfoWindowContent(),
              backgroundColor: "#fff",
              borderColor: "#333",
              borderWidth: 2
            });
      
            window.naver.maps.Event.addListener(marker, 'click', () => {
              if (infoWindowRef.current) {
                infoWindowRef.current.open(mapRef.current, marker);
              }
            });
      
            circleRef.current = new window.naver.maps.Circle({
              map: mapRef.current,
              center: initialLocation,
              radius: 10,
              strokeColor: 'red',
              strokeOpacity: 0.7,
              strokeWeight: 2,
              fillColor: 'red',
              fillOpacity: 0.2
            });
      
            if (navigator.geolocation) {
              navigator.geolocation.watchPosition((position) => {
                const userLocation = new window.naver.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                );
      
                circleRef.current.setCenter(userLocation);
      
                if (userLocationMarkerRef.current) {
                  userLocationMarkerRef.current.setPosition(userLocation);
                } else {
                  userLocationMarkerRef.current = new window.naver.maps.Marker({
                    position: userLocation,
                    map: mapRef.current,
                    icon: {
                      content: '<div style="background-color:red;width:10px;height:10px;border-radius:50%;"></div>',
                      anchor: new window.naver.maps.Point(5, 5)
                    }
                  });
                }
              });
            }
      
            window.updateDetailInfo = updateDetailInfo;
            window.closeInfoWindow = closeInfoWindow;
          }
        }, []);
      
        const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
        };
      
        return (
          <div className="App">
            <div className="title" id='border'> 
              <div className='title_child' id='border'>LOGO</div>
              <div className='title_search'>        
                <input className='search' value={inputWord} onChange={(e) => setWord(e.target.value)} />
                <img className='searchname' alt='search' src='img/search.png' />
              </div>
              <img className='menubtn' alt='menu' src='img/menu.png' onClick={toggleMenu} />
            </div>  
      
            <div className="main_container" id='border'>
              <div className='main_list' id='border'>LIST</div>
              <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh' }}></div>
              <div className={`main_menu ${isMenuOpen ? 'menu-open' : ''}`} id='border'>
                <br /><br />
                <h2>제목1</h2>
                <p>내용을 넣으세요.</p>
                <h2>제목2</h2>
                <p>내용을 넣으세요.</p>
              </div>
            </div>
      
            {/* 숨겨진 닫기 버튼 */}
            <button id="closeInfoWindowButton" style={{ display: 'none' }} onClick={closeInfoWindow}></button>
          </div>
        );
      }
      
      export default App;
      

      infoWindowRef.current = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent(),
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.open(mapRef.current, marker);
        }
      });

      circleRef.current = new window.naver.maps.Circle({
        map: mapRef.current,
        center: initialLocation,
        radius: 10,
        strokeColor: 'red',
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: 'red',
        fillOpacity: 0.2
      });

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          const userLocation = new window.naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          circleRef.current.setCenter(userLocation);

          if (userLocationMarkerRef.current) {
            userLocationMarkerRef.current.setPosition(userLocation);
          } else {
            userLocationMarkerRef.current = new window.naver.maps.Marker({
              position: userLocation,
              map: mapRef.current,
              icon: {
                content: '<div style="background-color:red;width:10px;height:10px;border-radius:50%;"></div>',
                anchor: new window.naver.maps.Point(5, 5)
              }
            });
          }
        });
      }

      window.updateDetailInfo = updateDetailInfo;
      window.closeInfoWindow = closeInfoWindow;
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <div className="title" id='border'> 
        <div className='title_child' id='border'>LOGO</div>
        <div className='title_search'>        
          <input className='search' value={inputWord} onChange={(e) => setWord(e.target.value)} />
          <img className='searchname' alt='search' src='img/search.png' />
        </div>
        <img className='menubtn' alt='menu' src='img/menu.png' onClick={toggleMenu} />
      </div>  

      <div className="main_container" id='border'>
        <div className='main_list' id='border'>LIST</div>
        <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh' }}></div>
        <div className={`main_menu ${isMenuOpen ? 'menu-open' : ''}`} id='border'>
          <br /><br />
          <h2>제목1</h2>
          <p>내용을 넣으세요.</p>
          <h2>제목2</h2>
          <p>내용을 넣으세요.</p>
        </div>
      </div>

      {/* 숨겨진 닫기 버튼 */}
      <button id="closeInfoWindowButton" style={{ display: 'none' }} onClick={closeInfoWindow}></button>
    </div>
  );
}

export default App;
