import React, { useState } from 'react';

const LoginPage = ({getemail, getpassword, getregemail, gettoken}) => {

    const [isRegister, setIsRegister] = useState(true);

    const RegisterVisible = () => {
        setIsRegister(!isRegister);
    }

    return (
        <div>
            {isRegister && (
                <div>
                    <div>아이디를 입력하세요</div>
                    <input className='w-50 py-1' onChange={getemail}/>
                    <div>비밀번호를 입력하세요</div>
                    <input className='w-50 py-1' onChange={getpassword} />
                    <div>
                    <button onClick={RegisterVisible}>회원이 아니신가요?</button>
                    </div>
                </div>
            )}

            {!isRegister && (
                <div>
                    <div>회원가입에 사용할 이메일을 입력해 주세요</div>
                    <input className='w-50 py-1' onChange={getregemail} />
                    <div>인증번호를 입력해주세요</div>
                    <input className='w-50 py-1' onChange={gettoken} />
                    <div>
                        <button>Verify</button>
                        <p></p>
                    </div>
                    <div>
                        <button onClick={RegisterVisible}>뒤로가기</button>
                    </div>
                </div>
            )}
        </div>
        
    );
}
export default LoginPage;