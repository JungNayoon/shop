import { Link } from 'react-router-dom'
import './Login.css'

function SignUp() {
    return (
        <div style={{ backgroundImage: 'linear-gradient(to bottom, #4A55A2, #C5DFF8)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div class="loginbox">
                <form>
                    <div class="head">
                        <span>회원가입</span>
                        <p></p>
                    </div>
                    <div class="inputs">
                        <input type="text" placeholder="성함" />
                        <input type="email" placeholder="이메일 주소" />
                        <input type="password" placeholder="비밀번호" />
                    </div>
                    <button>회원가입</button>
                    <div class="form-footer">
                        <p>계정이 있으신가요? <Link to='/login'>로그인</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;