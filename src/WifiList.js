import React, { useState } from 'react';
import Modal from 'react-modal';

const WifiList = ({WifiList}) => {

  let [getChooseIdx, setChooseIdx] = React.useState(-1);
  const [modalIsOpen, setIsOpen] = React.useState(false);


  function closeModal() {
    setIsOpen(false);
  }
    return (
        <div className='main_list'> 
          <table className= "table w-100">
            <thead className='thead-dark'>
              <th scope='col'>WIFI'S NAME</th>
              <th scope='col'>SPEED</th>
              <th scope='col'>ISPWD</th>
            </thead>
            <tbody>
              
              {WifiList.map((wifi, index) => (
                <tr key={index}>
                  <td onClick={()=>{
                      setChooseIdx(index);
                      setIsOpen(true);
                  }}>{wifi.name}</td>
                  <td>{wifi.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isOpen={modalIsOpen}
            
            onRequestClose={closeModal}>
              <p>{WifiList?.[getChooseIdx]?.name}</p>
              <p>{WifiList?.[getChooseIdx]?.speed}</p>
              <p>{WifiList?.[getChooseIdx]?.isPwd}</p>
          </Modal>
        </div>
    );
}

export default WifiList;