import React, { useState } from 'react';
import Modal from 'react-modal';
import { getWifi } from './_request';

const WifiList = ({ WifiList }) => {
  let [getChooseIdx, setChooseIdx] = React.useState (-1);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
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
            <tr>
              <td>이름</td>
              <td>{WifiList?.[getChooseIdx]?.wifiName}</td>
            </tr>
            <tr>
              <td>다운로드 속도</td>
              <td>{WifiList?.[getChooseIdx]?.downloadSpeed}</td>
            </tr>
            <tr>
              <td>업로드 속도</td>
              <td>{WifiList?.[getChooseIdx]?.uploadSpeed}</td>
            </tr>
            <tr>
              <td>측정 시간</td>
              <td>{WifiList?.[getChooseIdx]?.lastUpdate}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default WifiList;