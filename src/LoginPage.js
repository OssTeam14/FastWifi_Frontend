import React, { useState } from 'react';
import { emailVerification, sendMail, signUp } from './_request';
import { CookiesProvider, useCookies } from 'react-cookie'

const LoginPage = ({onLogin, onLogout}) => {

    const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifycode, setVerifyCode] = useState('');
    const [newpwd, setNewPwd] = useState('');

    const [isRegister, setIsRegister] = useState(true);
    const [verifymail, setVerifyMail] = useState(true);
    const [newRegister, setNewRegister] = useState(false);
   

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

    const handleVerifyChange = (e) => {
        setVerifyCode(e.target.value);
    }

    const handleNewPwdChange = (e) => {
        setNewPwd(e.target.value);
    }

    const RegisterVisible = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div>
            {isRegister && !cookies.accessToken && (
                <div className='justify-content-center mt-5'>
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
                <div className='justify-content-center mt-5'>
                    <div className='w-100 h-50'>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>회원가입에 사용할 이메일을 입력해 주세요</div>
                            <input type="text" value={email} onChange={handleEmailChange}/>
                        </div>
                        
                        {verifymail && (
                            <button onClick={()=>{                       
                                sendMail(email).then( (e) =>{
                                    if (e) {
                                        alert("이메일을 발송하였습니다.")
                                        setVerifyMail(!verifymail);
                                    } else {
                                        alert("잘못된 이메일 형식입니다!")
                                    }
                                })
                                .catch((error) => {
                                    alert("잘못된 이메일 형식입니다!")
                                });
                            }}>VERIFY</button>
                        )}

                        {!verifymail && !newRegister &&(
                            <div>
                                <div className='w-100 h-25 py-2 mt-3'>
                                    <div>인증번호를 입력해주세요</div>
                                    <input type="text" value={verifycode} onChange={handleVerifyChange}/>
                                </div> 
                                <button onClick={() => {
                                    emailVerification(email, verifycode)
                                    .then((e) => {
                                        console.log(e)
                                        if (e) {
                                            alert("인증되었습니다.")
                                            setNewRegister(!newRegister);
                                        } else {
                                        alert("인증 실패 !")
                                    }
                                    })  
                                    .catch((error) => {
                                        alert("인증 실패!");
                                    });         
                                }}>인증확인</button>
                            </div>
                        )}

                        {!verifymail && newRegister && (
                            <div>
                                <div className='w-100 h-25 py-2 mt-3'>
                                    <div> 사용할 비밀번호를 입력해주세요 </div>
                                    <input type="password" value={newpwd} onChange={handleNewPwdChange}/>
                                </div>
                                <button onClick={() => {
                                    signUp(email, newpwd)
                                    .then((e) => {
                                        if (e) {
                                            alert("회원가입이 완료되었습니다.")
                                            window.location.replace("./")
                                        } else {
                                            alert("잘못된 비밀번호 형식입니다! 다시 입력해주세요")
                                        }
                                    })
                                    .catch((error) => {
                                        alert("잘못된 비밀번호 형식입니다! 다시 입력해주세요")
                                    });                                    
                                }}>회원가입</button>
                            </div>
                        )}
                        <p></p>
                        <button onClick={() => {
                            setIsRegister(true);
                            setVerifyMail(true);
                            setNewRegister(false);
                        }}>뒤로가기</button>
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