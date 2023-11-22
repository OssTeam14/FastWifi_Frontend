import React, { useState } from 'react';

export default WifiDetail = ({Wifi}) => {
    return (
        <div className='main_list'> 
          <table className= "table w-100">
            <thead className='thead-dark'>
              <th scope='col'>WIFI'S NAME</th>
              <th scope='col'>SPEED</th>
              <th scope='col'>ISPWD</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {Wifi.name}
                </td>
                <td>{Wifi.speed}</td>
                <td className='material-symbols-outlined'>{!Wifi.isPwd ? "" : "Key"}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
}
