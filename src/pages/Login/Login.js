import { Link } from 'react-router-dom'
import './Login.css'


function Login() {
    return (
        <div style={{ backgroundImage: 'linear-gradient(to bottom, #4A55A2, #C5DFF8)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div class="loginbox">
                <form>
                    <div class="head">
                        <span>로그인</span>
                        <p></p>
                    </div>
                    <div class="inputs">
                        <input type="email" placeholder="이메일 주소" />
                        <input type="password" placeholder="비밀번호" />
                    </div>
                    <button>로그인</button>
                    <div class="form-footer">
                        <p>계정이 없으신가요? <Link to='/signup'>회원가입</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;