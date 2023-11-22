import React, { useState } from 'react';
import { sendMail } from './_request';
import { CookiesProvider, useCookies } from 'react-cookie'

const LoginPage = ({onLogin, onLogout, getVerify, gettoken}) => {

    const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isRegister, setIsRegister] = useState(true);
    const [verifymail, setVerifyMail] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginClick = () => {
        onLogin(email, password);

    };

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
    };

    const RegisterVisible = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div>
            {isRegister && !cookies.accessToken && (
                <div className='justify-content-center'>
                    <div className='w-100 h-50'>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>아이디를 입력하세요</div>
                            <input type="text" value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>비밀번호를 입력하세요</div>
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </div> 
                        <button type='button' onClick={handleLoginClick}>로그인</button>
                        <button onClick={RegisterVisible}>회원이 아니신가요?</button>
                    </div>                               
                </div>
            )}

            {!isRegister && !cookies.accessToken && (
                <div className='justify-content-center'>
                    <div className='w-100 h-50'>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>회원가입에 사용할 이메일을 입력해 주세요</div>
                            <input value={email} onChange={handleEmailChange}/>
                        </div>
                        
                        {verifymail && (
                            <button onClick={()=>{                              
                                sendMail(email).then(e=>{
                                    alert("이메일을 발송하였습니다.")
                                    setVerifyMail(!verifymail);
                                })
    
                            }}>VERIFY</button>
                        )}

                        {!verifymail && (
                            <div>
                                <div className='w-100 h-25 py-2 mt-3'>
                                    <div>인증번호를 입력해주세요</div>
                                    <input />
                                </div> 
                                <div className='w-100 h-25 py-2 mt-3'>
                                    <div> 사용할 비밀번호를 입력해주세요 </div>
                                    <input />
                                </div>
                                <button>회원가입</button>
                            </div>
                        )}
                        <p></p>
                        <button onClick={RegisterVisible}>뒤로가기</button>
                    </div>
                </div>
            )}

            {cookies.accessToken &&(
                <button onClick={handleLogoutClick}>로그아웃</button>
            )}
        </div>
        
    );
}
export default LoginPage;