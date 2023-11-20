import React, { useEffect, useRef } from 'react';

function Map({ mapContainer }) {
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const circleRef = useRef(null);
  const userLocationMarkerRef = useRef(null);

  const createInfoWindowContent = () => {
    // createInfoWindowContent 로직을 여기에 구현하세요
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

  //세부 정보를 업데이트 하는 함수
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
      const initialLocation = new window.naver.maps.LatLng(37.619117926932844, 127.06007263550102); //비마관으로 위치초기화
      const options = {
        center: initialLocation,
        zoom: 19
      };

      mapRef.current = new window.naver.maps.Map(mapContainer.current, options);

      const specificLocation = new window.naver.maps.LatLng(37.61964049095391, 127.0600900465389); //비마관마커
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

      window.naver.maps.Event.addListener(marker, 'click', () => { //비마관마커
        if (infoWindowRef.current) {
          infoWindowRef.current.open(mapRef.current, marker);
        }
      });

      circleRef.current = new window.naver.maps.Circle({ //현위치
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

  return (
    <div className='main_map' ref={mapContainer}></div>
  );
}

export default Map;