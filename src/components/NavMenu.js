import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function NavMenu(props) {
        return (
            <div className='navmenu'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', marginLeft: '30px' }}>
                        <Link to='/' style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>ShoeShop</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
                        <NavDropdown title='고객센터' style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>
                            <NavDropdown.Item href="/about/notice">공지사항</NavDropdown.Item>
                            <NavDropdown.Item href="/about/ask">1:1 상담</NavDropdown.Item>
                            <NavDropdown.Item href="/about/event">이벤트</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div style={{ marginRight: '30px' }}>
                    <Link to="/cart" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>장바구니</Link>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>로그인</Link>
                    <Link to="/signup" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>회원가입</Link>
                    <button class="shadow__btn" onClick={props.handleShow}>최근 본 상품</button>
                </div>
            </div >
        )
    }

export default NavMenu;