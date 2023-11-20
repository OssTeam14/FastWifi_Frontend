import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/scss/bootstrap.scss";
import Search from './Search';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import './App.css';

function App() {
  const [searchResult, setSearchResult] = useState('');
  const [inputWord, setWord] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴의 활성화 여부 확인 변수
  const [isMapVisible, setIsMapVisible] = useState(true); // 지도의 활성화 여부 확인 변수
  const [detailInfo, setDetailInfo] = useState({ title: '', content: '' });
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const circleRef = useRef(null);
  const userLocationMarkerRef = useRef(null);

  const data_lists = [
    {id: 1, location: '기념', wifi_name: 'Kwangwoon_KT', wifi_speed: '180mbps', measure_time: '17:14 / 231024'},
    {id: 2, location: '기념', wifi_name: 'amanokw', wifi_speed: 'none', measure_time: 'none'},
    {id: 3, location: '기념', wifi_name: 'amanokw5G'},
    {id: 4, location: '기념', wifi_name: 'kw_02열람실01'},
    {id: 5, location: '기념', wifi_name: 'kw_02열람실02'},
    {id: 6, location: '기념', wifi_name: 'kw_03열람실03'},
    {id: 7, location: '기념', wifi_name: 'kw_인문열람실01'},
    {id: 8, location: '비마', wifi_name: 'Kwangwoon_KT'},
    {id: 9, location: '기념', wifi_name: 'KW_기념관301_강의실'},
    {id: 10, location: '기념', wifi_name: 'KW_기념관305_강의실'}
  ];

  //마커 정보창 콘텐츠 생성 함수
  const createInfoWindowContent = (info) => {
    return `
      <div class="info_window">
        <h4>${info.title || '리스트 제목'}</h4>
        <ul>
          <li><button onclick="window.updateDetailInfo('${info.button1}')">${info.button1}</button></li>
          <li><button onclick="window.updateDetailInfo('${info.button2}')">${info.button2}</button></li>
          <li><button onclick="window.updateDetailInfo('${info.button3}')">${info.button3}</button></li>
        </ul>
        ${info.content ? `<p>${info.content}</p>` : ''}
        <button onclick="window.closeInfoWindow()">닫기</button>
      </div>
    `;
  };

  //마커 정보 정의
  const markerInfoArray = [
    {
      position: new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389),
      title: '비마 1',
      content: '세부정보 1',
      button1: '비마 1',
      button2: '비마 2',
      button3: '비마 3',
    },
    {
      position: new window.naver.maps.LatLng(37.61978874889574, 127.06088022970086),
      title: '새빛 1',
      content: '세부정보 1',
      button1: '새빛 1',
      button2: '새빛 2',
      button3: '새빛 3',
    },
    {
      position: new window.naver.maps.LatLng(37.619270641711566, 127.06095626449199),
      title: '참빛 1',
      content: '세부정보 1',
      button1: '참빛 1',
      button2: '참빛 2',
      button3: '참빛 3',
    },
    {
      position: new window.naver.maps.LatLng(37.62002409207653, 127.05873676492713),
      title: '기념 1',
      content: '세부정보 1',
      button1: '기념 1',
      button2: '기념 2',
      button3: '기념 3',
    }
  ]

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
    if (window.naver && window.naver.maps && isMapVisible) { // isMapVisible 상태에 따라 지도 생성 여부 판단
      const initialLocation = new window.naver.maps.LatLng(37.619117926932844, 127.06007263550102);//비마관으로 위치초기화
      const options = {
        center: initialLocation,
        zoom: 19
      };

      mapRef.current = new window.naver.maps.Map(mapContainer.current, options);

  
      // 마커와 인포윈도우 생성
      markerInfoArray.forEach((markerInfo) => {
        const marker = new window.naver.maps.Marker({
            position: markerInfo.position,
            map: mapRef.current,
          });
  
        const infoWindow = new window.naver.maps.InfoWindow({
          content: createInfoWindowContent(markerInfo),
          backgroundColor: "#fff",
          borderColor: "#333",
          borderWidth: 2,
         });
  
        window.naver.maps.Event.addListener(marker, 'click', () => {
          if (infoWindow) {
            infoWindow.open(mapRef.current, marker);
          }
        });
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
      window.closeInfoWindow = closeInfoWindow;
    }
  }, [isMapVisible]);

  //리스트에서 와이파이의 이름만을 보여주는 함수
  const list_show = data_lists.map ((wifiname) => <li>{wifiname.wifi_name}</li>);

  // 검색창에서 입력한 단어 확인
  const [userInput, setUserInput] = useState('');
  // 대소문자 구별 없애기
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase())
  };

  // 필터링
  const searched = data_lists.filter((item) => item.wifi_name.toLowerCase().includes(userInput))
  // 필터링된 리스트 보여주기
  const searched_listshow = searched.map((item) => <p>{item.id} {item.wifi_name}</p>)

  //모달 상태를 저장할 변수와 그 상태를 업데이트 하는 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달을 열거나 닫는 함수
  const setModalState = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  // 토글 버튼 클릭 시 지도 가시성을 변경하는 함수
  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  //리스트 출력시 : ul안에 list_show / 검색기능 확인시 : ul안에 searched_listshow
  return (
    <Router>
      <div className="App">
        <SearchBar getValue={getValue} setModalState={toggleMapVisibility} toggleMenu={toggleMenu}/>
        <div className="main_container" id='border'>

          {!isMapVisible && ( 
            <div className='main_list' id='border'> 
              <ul>
                {searched_listshow} 
              </ul>
            </div>
          )}
          
          {isMapVisible && (
            <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh'}}></div>
          )}
          
          <button className="main_togglebtn" onClick={toggleMapVisibility}>
            {isMapVisible ? '지도 끄기' : '지도 켜기'}
          </button>
          
          <div className={`main_menu ${isMenuOpen ? 'menu-open' : ''}`} id='border'>
            <br />
            <Link to="/">로그인</Link>
            <p> 로그인을 통해 비밀번호를 확인할 수 있습니다.</p>
            <br />
            <Link to="/search">Search</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route
            path="/search"
            element={<Search onSearch={handleSearch} />}
          />
          <Route
            path="/search-result"
            element={<SearchResult result={searchResult} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;