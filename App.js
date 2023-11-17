import './App.css';
import { useState, useEffect, useRef } from 'react';
import Map from './Map';
import Search from './Search';

function App() {
  const [inputword, setWord] = useState("");
  const mapContainer = useRef(null);
  let today = '2023-10-30';

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

  return (
    <div className="App">
        <Search getValue={getValue} setModalState={setModalState} />
      <div className="main_container" id='border'>
        <div className='main_list' id='border'>
          <ul>
            {list_show}
          </ul>
        </div>
        <Map mapContainer={mapContainer} />
        <div className='main_menu' id='border'>
          {searched_listshow}
        </div>
      </div>
      <h4>{ today }</h4>
    </div>
  );
}

export default App;