import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [inputWord, setWord] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState({ title: '', content: '' });
  const [detailInfo2, setDetailInfo2] = useState({ title: '', content: '' });
  const [detailInfo3, setDetailInfo3] = useState({ title: '', content: '' });
  const [detailInfo4, setDetailInfo4] = useState({ title: '', content: '' });
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const infoWindowRef2 = useRef(null);
  const infoWindowRef3 = useRef(null);
  const infoWindowRef4 = useRef(null);
  const circleRef = useRef(null);
  const userLocationMarkerRef = useRef(null);
  

  // 인포윈도우 콘텐츠 생성 함수
  const createInfoWindowContent = () => {//비마
    return `
      <div class="info-window" style="width: 200px; padding: 10px;">
        <h4>${detailInfo.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('항목 1')">비마 1</button></li>
          <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
          <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
        </ul>
        ${detailInfo.content ? `<p>${detailInfo.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };
  const createInfoWindowContent2 = () => {//새빛
    return `
      <div class="info-window" style="width: 200px; padding: 10px;">
        <h4>${detailInfo.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('항목 1')">새빛 1</button></li>
          <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
          <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
        </ul>
        ${detailInfo2.content ? `<p>${detailInfo2.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };
  const createInfoWindowContent3 = () => {//참빛
    return `
      <div class="info-window" style="width: 200px; padding: 10px;">
        <h4>${detailInfo.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('항목 1')">참빛 1</button></li>
          <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
          <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
        </ul>
        ${detailInfo3.content ? `<p>${detailInfo3.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };
  const createInfoWindowContent4 = () => {//비마
    return `
      <div class="info-window" style="width: 200px; padding: 10px;">
        <h4>${detailInfo.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('항목 1')">비마 1</button></li>
          <li><button onclick="window.updateDetailInfo('항목 2')">항목 2</button></li>
          <li><button onclick="window.updateDetailInfo('항목 3')">항목 3</button></li>
        </ul>
        ${detailInfo4.content ? `<p>${detailInfo4.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };
  // 세부 정보를 업데이트하는 함수
  const updateDetailInfo = (item) => {
    const details = {
      '비마 1': { title: '비마 1', content: '세부정보 1' },
      '비마 2': { title: '비마 2', content: '세부정보 2' },
      '비마 3': { title: '비마 3', content: '세부정보 3' },
    };
    setDetailInfo(details[item]);
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(createInfoWindowContent(details[item]));
    }
  };
  const updateDetailInfo2 = (item) => {
    const details = {
      '새빛 1': { title: '항목 1', content: '세부정보 1' },
      '새빛 2': { title: '항목 2', content: '세부정보 2' },
      '항목 3': { title: '항목 3', content: '세부정보 3' },
    };
    setDetailInfo2(details[item]);
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(createInfoWindowContent2(details[item]));
    }
  };
  const updateDetailInfo3 = (item) => {
    const details = {
      '새빛 1': { title: '항목 1', content: '세부정보 1' },
      '새빛 2': { title: '항목 2', content: '세부정보 2' },
      '항목 3': { title: '항목 3', content: '세부정보 3' },
    };
    setDetailInfo3(details[item]);
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(createInfoWindowContent3(details[item]));
    }
  };
  const updateDetailInfo4 = (item) => {
    const details = {
      '비마 1': { title: '비마 1', content: '세부정보 1' },
      '비마 2': { title: '비마 2', content: '세부정보 2' },
      '비마 3': { title: '비마 3', content: '세부정보 3' },
    };
    setDetailInfo4(details[item]);
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(createInfoWindowContent4(details[item]));
    }
  };
  // 인포윈도우를 닫는 함수
  const closeInfoWindow = () => {
    setDetailInfo({ title: '', content: '' }); // 상태를 초기화합니다.
  
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    if (infoWindowRef2.current) {
      infoWindowRef2.current.close();
    }
    if (infoWindowRef3.current) {
      infoWindowRef3.current.close(); // 세 번째 인포윈도우 닫기
    }
    if (infoWindowRef4.current) {
      infoWindowRef4.current.close(); // 세 번째 인포윈도우 닫기
    }
  };
  
  
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      const initialLocation = new window.naver.maps.LatLng(37.619117926932844, 127.06007263550102);//비마관으로 위치초기화
      const options = {
        center: initialLocation,
        zoom: 19
      };

      mapRef.current = new window.naver.maps.Map(mapContainer.current, options);

      const specificLocation = new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389);//비마관마커
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
      
      window.naver.maps.Event.addListener(marker, 'click', () => {//비마관마커
        if (infoWindowRef.current) {
          infoWindowRef.current.open(mapRef.current, marker);
        }
      });

      // 두 번째 마커와 인포윈도우 생성
      const specificLocation2 = new window.naver.maps.LatLng(37.61978874889574, 127.06088022970086);
      const marker2 = new window.naver.maps.Marker({
      position: specificLocation2,
        map: mapRef.current
      });

      const infoWindow2 = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent2(), // 두 번째 마커에 대한 콘텐츠 생성 함수
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      window.naver.maps.Event.addListener(marker2, 'click', () => {
        if (infoWindow2) {
          infoWindow2.open(mapRef.current, marker2);
        }
      });
      infoWindowRef2.current = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent2(),
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      // 3 번째 마커와 인포윈도우 생성
      const specificLocation3 = new window.naver.maps.LatLng(37.619270641711566, 127.06095626449199);
      const marker3 = new window.naver.maps.Marker({
      position: specificLocation3,
        map: mapRef.current
      });

      const infoWindow3 = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent3(), // 두 번째 마커에 대한 콘텐츠 생성 함수
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      window.naver.maps.Event.addListener(marker3, 'click', () => {
        if (infoWindow3) {
          infoWindow3.open(mapRef.current, marker3);
        }
      });
      infoWindowRef3.current = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent3(),
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });
      //기념관마커
      const specificLocation4 = new window.naver.maps.LatLng(37.62002409207653, 127.05873676492713);
      const marker4 = new window.naver.maps.Marker({
      position: specificLocation4,
        map: mapRef.current
      });

      const infoWindow4 = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent4(), // 두 번째 마커에 대한 콘텐츠 생성 함수
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      window.naver.maps.Event.addListener(marker4, 'click', () => {
        if (infoWindow4) {
          infoWindow4.open(mapRef.current, marker4);
        }
      });
      infoWindowRef4.current = new window.naver.maps.InfoWindow({
        content: createInfoWindowContent4(),
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 2
      });

      circleRef.current = new window.naver.maps.Circle({//현위치
        map: mapRef.current,
        center: initialLocation,
        radius: 10,//원 크기
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
      window.updateDetailInfo2 = updateDetailInfo2;
      window.updateDetailInfo3 = updateDetailInfo3;
      window.updateDetailInfo4 = updateDetailInfo4;
      window.closeInfoWindow = closeInfoWindow;
      
    }// eslint-disable-next-line react-hooks/exhaustive-deps
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