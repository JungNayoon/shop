import { Link } from 'react-router-dom'
import './Login.css'


function Login() {
    return (
        <div className='background'>
            <div style={{ display: 'flex', alignItems:'center', height:'100px'}}>
                <Link to='/' style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>ShoeShop</Link>
            </div>
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