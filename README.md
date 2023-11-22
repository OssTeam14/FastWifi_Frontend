# 광운대학교 와이파이 속도 제공 웹 서비스

## KwFastWifi Front-end

![Static Badge](https://img.shields.io/badge/verson-1.0.1-blue)

## 👥맴버 소개
- 신창윤 : 프론트엔드 리드 개발자
- 김민곤 : 프론트엔드 개발자
- 고현우 : 프론트엔드 개발자

## 🔗관련 링크

---
> Back-end: [KwFastWifiBack](https://github.com/OssTeam14/FastWifi_Backend)   
Front-end: [KwFastWifiBack](https://github.com/OssTeam14/FastWifi_Front)   
Web site : <https://github.com/OssTeam14/FastWifi>

## 🔎기능 소개
* 맵 기능
  > 네이버 맵 API를 가져와 메인 페이지에 지도를 구성하였습니다. 지도에서는 현재 위치와 서버에 저장된 와이파이의 위치를 확인할 수 있는 맵 핀 기능이 구현되어있습니다.
* 밉 핀 기능
  > 맵 기능 안의 부속 기능으로, 서버에 저장된 와이파이의 위치를 좀 더 보기 쉽게 표시해주는 역할을 하고 있습니다.
* 리스트 출력 기능
  > 맵 만으로는 와이파이 정보를 자세하게 전달하기엔 어려움이 있으므로, 버튼을 통해 지도를 사라지게 한 뒤, 리스트를 통해 현재 서버에 존재하는 와이파이의 정보를 한 눈에 볼 수 있는 리스트를 출력합니다.
* 검색 기능
  > 리스트 출력을 통해 와이파이 정보를 확인할 때 사용할 수 있는 기능으로, 상단의 검색바에 자신이 찾고 싶는 와이파이에 포함된 키워드를 통해 검색 결과를 확인할 수 있습니다.
* 로그인 기능
  > 와이파이 정보에서 비밀번호 부분을 제공하기 위해 존재하는 기능으로, 로그인에 성공한다면 비밀번호를 제공 받을 수 있습니다.
* 회원가입 기능
  > 와이파이 정보에서 비밀번호 부분을 제공하기 위해 존재하는 기능으로, 회원가입을 통해 이메일에서 인증 번호를 받고 인증에 성공한다면 아이디를 만들 수 있는 기능을 제공합니다.

### ✨건물별에 따른 학교 와이파이 리스트 제공
  * 새빛관
  * 참빛관
  * 비마관
  * 비마관
  * **그외 건물 정보 추후 업데이트 예정**

### ✨학교 와이파이 세부 정보 제공
  * 다운로드 속도
  * 업로드 속도
  * 비밀번호 (권한 필요)
  * 마지막 업데이트 날짜 

### ✨이메일 인증에 따른 로그인
  * 학교 이메일 인증 시 자동으로 비밀번호 확인 권한 제공


## ⭐ 시작 가이드

### `npm install`

프로젝트에서 요구하는 패키지들을 설치합니다.

### `npm run build`

앱을 프로덕션 모드로 빌드하여 build 폴더에 배치합니다. React를 프로덕션 모드로 올바르게 번들링하고 최적화하여 최상의 성능을 달성합니다.

### `npm run start`

앱을 실행합니다. 
