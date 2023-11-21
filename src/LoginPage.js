import React, { useState } from 'react';

const LoginPage = ({onLogin, onLogout, getVerify, gettoken}) => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifymail, setVerifyMail] = useState('');

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

    const [isRegister, setIsRegister] = useState(true);

    const RegisterVisible = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div>
            {isRegister && (
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

            {!isRegister && (
                <div className='justify-content-center'>
                    <div className='w-100 h-50'>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>회원가입에 사용할 이메일을 입력해 주세요</div>
                            <input value={email}/>
                        </div>
                        <div className='w-100 h-25 py-2 mt-3'>
                            <div>인증번호를 입력해주세요</div>
                            <input />
                        </div> 
                        <button>VERIFY</button>
                        <p></p>
                        <button onClick={RegisterVisible}>뒤로가기</button>
                    </div>
                </div>
            )}

            {!onLogout && (
                <button onClick={handleLogoutClick}>로그아웃</button>
            )}
        </div>
        
    );
}
export default LoginPage;