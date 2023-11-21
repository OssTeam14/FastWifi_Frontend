import React, { useState } from 'react';

const WifiList = ({WifiList}) => {
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
                  <td>{wifi.name}</td>
                  <td>{wifi.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

export default WifiList;