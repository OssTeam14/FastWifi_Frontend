import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/scss/bootstrap.scss";
import Search from './Search';
import SearchBar from './SearchBar';
import LoginPage from './LoginPage';
import WifiList from './WifiList';
import { CookiesProvider, useCookies } from 'react-cookie'
import { emailVerification, getWifiList, login, logout, sendMail, signUp } from './_request';
import './App.css';
import { removeCookies, setCookies } from './cookie';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
  const [wifiList, setWifiList] = useState([]);
  const [wifiname, setWifiName] = useState();
  const [floor, setFloor] = useState();

  const [isMapVisible, setIsMapVisible] = useState(true); // 지도의 활성화 여부 확인 변수
  const [isHomeVisible, setIsHomeVisible] = useState(true); // 로그인 템플릿 활성화 여부 확인 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 여부 확인 
  const [detailInfo, setDetailInfo] = useState({ title: '', content: '' });
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const circleRef = useRef(null);
  const userLocationMarkerRef = useRef(null);

  const [isSB1, setIsSB1] = useState(false);
  const [isSB2, setIsSB2] = useState(false);
  const [isSB3, setIsSB3] = useState(false);
  const [isSB4, setIsSB4] = useState(false);
 

  //마커 정보 정의
  const markerInfoArray = [
    {
      position: new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389),
      building: "새빛관",
      setIsSB: setIsSB2,
    },
    {
      position: new window.naver.maps.LatLng(37.61978874889574, 127.06088022970086),
      building: "비마관",
      setIsSB: setIsSB1,
    },
    {
      position: new window.naver.maps.LatLng(37.619270641711566, 127.06095626449199),
      building: "참빛관",
      setIsSB: setIsSB3,
    },
    {
      position: new window.naver.maps.LatLng(37.62002409207653, 127.05873676492713),
      building: "기념관",
      setIsSB: setIsSB4,
    }
  ]



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
        const {position, building, setIsSB} = markerInfo;
        const marker = new window.naver.maps.Marker({
            position: markerInfo.position,
            map: mapRef.current,
          });
  
        window.naver.maps.Event.addListener(marker, 'click', () => {
          setWifiName(building);
          setIsMapVisible(false);
          setIsSB(true);
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

    }
  }, [isMapVisible, setWifiName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWifiList(wifiname, floor);
        setWifiList(result);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, [wifiname, floor]);

  // 검색창에서 입력한 단어 확인
  const [userInput, setUserInput] = useState('');
  // 대소문자 구별 없애기
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase())
  };

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

  const homeVisibility = () => {
    setIsHomeVisible(!isHomeVisible);
    setIsMapVisible(!isMapVisible);
  }

  const handlestatus = () => {
    setIsLoggedIn((prev) => !prev);
  }

  const handleLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (result.accessToken) {
        setIsLoggedIn(true);
        setCookies("accessToken", result.accessToken);
        alert("로그인 되었습니다!");
        window.location.replace("./")
      } else {
        alert("아이디나 비밀번호가 틀렸습니다!");
      }
    }
    catch (error) {
      alert("아이디나 비밀번호가 틀렸습니다!");
    }
  };

  const handleLogout = async () => {
    try {
      //await logout();
      removeCookies("accessToken");
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout Error', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {

      } catch (error) {
        console.error('Login Status Error', error);
      }
    };

    checkLoginStatus();
  })

  return (
    <Router>
      <div className="App">
        <SearchBar getValue={getValue} setModalState={toggleMapVisibility} toggleMenu={homeVisibility} loginstatus={isLoggedIn}/>
        <div className="main_container">

          {!isMapVisible && isHomeVisible && ( 
            <WifiList WifiList={userInput === "" ? wifiList : wifiList.filter(e => e.name.includes(userInput))} 
            setWifiName={setWifiName} 
            setFloor={setFloor} 
            set1={isSB1}
            set2={isSB2}
            set3={isSB3}
            set4={isSB4}/>
          )}

          {isHomeVisible && (
            <button className="main_togglebtn" onClick={() =>{
              toggleMapVisibility();
              setIsSB1(false);
              setIsSB2(false);
              setIsSB3(false);
              setIsSB4(false);
            }}>
              {isMapVisible ? '지도 끄기' : '지도 켜기'}
            </button>
          )}

          {isMapVisible && isHomeVisible && (
            <div className='main_map' ref={mapContainer} style={{ width: '100vw', height: '100vh'}}></div>
          )}


          {!isHomeVisible && (
            <LoginPage 
              onLogin={handleLogin}
              onLogout={handleLogout}
              ></LoginPage>
          )}         
        </div>

        <Routes>
          <Route path="/" element={<h5>LIST</h5>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;