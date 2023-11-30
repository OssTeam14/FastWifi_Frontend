import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getWifi } from './_request';

const WifiList = ({ WifiList, setWifiName, setFloor, set1, set2, set3, set4}) => {
  let [getChooseIdx, setChooseIdx] = React.useState (-1);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [wifiInfoList, setWifiInfoList] = useState([]);
  const [isSelectedFloor, setIsSelectedFloor] = useState(false);
  const [isSelectedBuilding, setIsSelectedBuilding] = useState(false);
  const [wifiname1, setWifiName1] = useState();
  const [floor1, setFloor1] = useState();

  const [isSB1, setIsSB1] = useState(false);
  const [isSB2, setIsSB2] = useState(false);
  const [isSB3, setIsSB3] = useState(false);
  const [isSB4, setIsSB4] = useState(false);

  useEffect(() => {
    if (set1 ===true) {
      setIsSelectedBuilding(true);
      setWifiName('새빛관');
      setWifiName1('새빛관');
      setIsSB1(true);
    }

    if (set2 === true) {
      setIsSelectedBuilding(true);
      setWifiName('비마관');
      setWifiName1('비마관');
      setIsSB2(true);
    }

    if (set3 === true) {
      setIsSelectedBuilding(true);
      setWifiName('참빛관');
      setWifiName1('참빛관');
      setIsSB3(true);
    }

    if (set4 === true) {
      setIsSelectedBuilding(true);
      setWifiName('기념관');
      setWifiName1('기념관');
      setIsSB4(true);
    }
  }, [set1, set2, set3, set4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // WifiList 배열을 순회하며 각 와이파이의 정보를 가져와 배열에 추가
        const infoList = await Promise.all(WifiList.map(async (wifi) => {
          const result = await getWifi(wifiname1, floor1, wifi.name);
          return result;
        }));
        setWifiInfoList(infoList);
        
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, [WifiList, wifiname1, floor1]); // WifiList가 변경될 때마다 다시 호출

  function closeModal() {
    setIsOpen(false);
  }

  function handlereset() {
    setIsSelectedBuilding(false);
    setIsSelectedFloor(false);
    setIsSB1(false);
    setIsSB2(false);
    setIsSB3(false);
    setIsSB4(false);
  }

  return (
    <div>
      {!isSelectedFloor && !isSelectedBuilding && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>건물</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedBuilding(true);
                    setIsSB1(true);
                    setWifiName('새빛관');
                    setWifiName1('새빛관');
                  }}
                >새빛관</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedBuilding(true);
                    setIsSB2(true);
                    setWifiName('비마관');
                    setWifiName1('비마관');
                  }}
                >비마관</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedBuilding(true);
                    setIsSB3(true);
                    setWifiName('참빛관');
                    setWifiName1('참빛관');
                  }}
                >참빛관</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedBuilding(true);
                    setIsSB4(true);
                    setWifiName('기념관');
                    setWifiName1('기념관');
                  }}
                >기념관</td>
              </tr>
            </tbody>
          </table>
      </div>
      )}

      {!isSelectedFloor && isSB1 && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>새빛관</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(1);
                    setFloor1(1);                    
                  }}
                >1 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(2);
                    setFloor1(2);
                  }}
                >2 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(3);
                    setFloor1(3);
                  }}
                >3 F</td>
              </tr>
            </tbody>
          </table>
          <button className='return_btn'
            onClick={() => {
              handlereset();
            }}
          >뒤로가기</button>
        </div>
      )}

      {!isSelectedFloor && isSB2 && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>비마관</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(2);
                    setFloor1(2);
                  }}
                >2 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(3);
                    setFloor1(3);
                  }}
                >3 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(4);
                    setFloor1(4);
                  }}
                >4 F</td>
              </tr>
            </tbody>
          </table>
          <button className='return_btn'
            onClick={() => {
              handlereset();
            }}
          >뒤로가기</button>
        </div>
      )}

      {!isSelectedFloor && isSB3 && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>참빛관</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(1);
                    setFloor1(1);
                  }}
                >1 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(2);
                    setFloor1(2);
                  }}
                >2 F</td>
              </tr>
            </tbody>
          </table>
          <button className='return_btn'
            onClick={() => {
              handlereset();
            }}
          >뒤로가기</button>
        </div>
      )}

      {!isSelectedFloor && isSB4 && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>기념관</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(1);
                    setFloor1(1);
                  }}
                >1 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(2);
                    setFloor1(2);
                  }}
                >2 F</td>
              </tr>
              <tr>
                <td
                  className='td_cursor'
                  onClick={() => {
                    setIsSelectedFloor(true);
                    setFloor(3);
                    setFloor1(3);
                  }}
                >3 F</td>
              </tr>          
            </tbody>
          </table>
          <button className='return_btn'
            onClick={() => {
              handlereset();
            }}
          >뒤로가기</button>
        </div>
      )}

      {isSelectedFloor && (
        <div className='main_list'>
          <table className='table w-100'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>WIFI'S NAME</th>
                <th scope='col'>SPEED</th>
                <th scope='col'>ISPWD</th>
              </tr>
            </thead>
            <tbody>
              {WifiList.map((wifi, index) => (
                <tr key={index}>
                  <td
                    className='td_cursor'
                    onClick={() => {
                      setChooseIdx(index);
                      setIsOpen(true);
                    }}
                  >
                    {wifi.name}
                  </td>
                  <td>{wifi.speed}</td>
                  <td>{wifi.isPwd? 'Yes' : 'No'}</td>
                </tr>
              ))}             
            </tbody>
          </table>
          <button className='return_btn'
            onClick={() => {
              handlereset();
            }}
          >뒤로가기</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                marginTop: '25vh',
              },
            }}
          >
            <table className='table'>
              <thead className='thead-dark'>
                <th scope='col'>항목</th>
                <th scope='col'>값</th>
              </thead>
              <tbody>
                {getChooseIdx !== -1 && (
                  <>
                  <tr>
                    <td>이름</td>
                    <td>{wifiInfoList[getChooseIdx]?.wifiName}</td>
                  </tr>
                  <tr>
                    <td>다운로드 속도</td>
                    <td>{wifiInfoList[getChooseIdx]?.downloadSpeed}</td>
                  </tr>
                  <tr>
                    <td>업로드 속도</td>
                    <td>{wifiInfoList[getChooseIdx]?.uploadSpeed}</td>
                  </tr>
                  <tr>
                    <td>측정 시간</td>
                    <td>{wifiInfoList[getChooseIdx]?.lastUpdate}</td>
                  </tr>
                </>
                )}
              </tbody>
            </table>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default WifiList;