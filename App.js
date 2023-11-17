import { useState, useEffect, useRef } from 'react';
import Search from './Search';

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
  }, []);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

//리스트 출력시 : ul안에 list_show / 검색기능 확인시 : ul안에 searched_listshow
  return (
    <div className="App">
        <Search getValue={getValue} setModalState={setModalState} toggleMenu={toggleMenu}/>
      <div className="main_container" id='border'>
        <div className='main_list' id='border'>
          <ul>
            {searched_listshow} 
          </ul>
        </div>
        <div className='main_map' id='border' ref={mapContainer} style={{ width: '100vw', height: '100vh'}}></div>
        
        <div className={`main_menu ${isMenuOpen ? 'menu-open' : ''}`} id='border'>
          <br /><br />
          <h2>제목1</h2>
          <p>내용을 넣으세요.</p>
          <h2>제목2</h2>
          <p>내용을 넣으세요.</p>
        </div>
    </div>
  </div>
  );
}

export default App;