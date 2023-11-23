import axios from "axios";

const MAINURL =  "http://3.35.132.61:8080";

/**
 * 이메일 사용 가능 여부
 * @return {Promise<boolean>}
 * @param {string} email
 */
export async function idAvailable(email){
    try{
        const res =  await axios.get(`${MAINURL}/auth/id-available`, {
            params: {
                email
            }
        });
        return res.data === "true";
    }
    catch(e){
        return false;
    }

}


/**
 * 인증메일 발송
 * @param {string} email
 * @return {Promise<boolean>}
 */
export async function sendMail(email){
    try{
        await axios.post(`${MAINURL}/verification/sign-up-code`, {
            email
        },{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        return true;
    }
    catch(e){
        return false;
    }

}

/**
 * 인증메일 검증
 * @param {string} email
 * @param {string} code
 * @return {Promise<boolean>}
 */
export async function emailVerification(email, code){
    try{

        const res = await axios.post(`${MAINURL}/verification/verify`,{
            email, code, "verifyingType" : "SIGN_UP"
        })
        return res.data === "인증 되었습니다";
    }
    catch(e){
        return false;

    }
}

/**
 * 회원가입
 * @param {string} email
 * @param {string} password
 * @return {Promise<boolean>}
 */
export async function  signUp(email, password){
    try{

        const res = await axios.post(`${MAINURL}/auth/sign-up`,{
            email, password
        })
        return res.data === "회원가입 완료";
    }
    catch(e){
        return false;
    }
}


/**
 * 로그인
 * @param {string} email
 * @param {string} password
 * @return {Promise<{accessToken : string|null, refreshToken : string|null}>}
 */
export async function login(email, password){
    try{
        const res = await axios.post(`${MAINURL}/auth/login`,{
            email, password
        })

        return res.data;
    }
    catch(e){
        return {
            "accessToken" : null,
            "refreshToken" : null
        }
    }
}

/**
 * 로그아웃
 */
export async function logout() {
    axios.get(`${MAINURL}/auth/logout`,{
        withCredentials : true
    })
}


/**
 * 와이파이 하나 얻기
 * @param {string} wifiName
 * @param {number}downloadSpeed
 * @param {number}uploadSpeed
 * @param {string}lastUpdate
 * @return {Promise<{wifiName : string, downloadSpeed : number, uploadSpeed : number, lastUpdate : string}|null>}
 */
export async function getWifi(buildingName,floor, wifiName){
    try{
        const res = await axios.post(`${MAINURL}/wifi`,{
            buildingName, floor, wifiName
        })

        return res.data;
    }
    catch(e){
        return null;
    }
}
/**
 *  와이파이 리스트 얻기
 * @param {string} buildingName
 * @param {number}floor
 * @return {Promise<{name : string, speed : "SLOW"|"NORMAL"|"FAST", isPwd : boolean}[]>}
 */
export async function getWifiList(buildingName,floor){
    try{
        const res = await axios.post(`${MAINURL}/wifiList`,{
            buildingName, floor
        })
        return res.data;
    }
    catch(e){
        return [];
    }
}

/**
 *  와이파이 비번 얻기
 * @param {string} buildingName
 * @param {number}floor
 * @param {string}wifiName
 * @return {Promise<{name : string, password : string}|null>}
 */
export async function getWifiPwd(buildingName,floor,wifiName){
    try{
        const res = await axios.post(`${MAINURL}/pwd`,{
            buildingName, floor, wifiName
        })
        return res.data;
    }
    catch(e){
        return null;
    }
}