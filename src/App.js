/* eslint-disable */
import './App.css';
import { Container, Nav, Navbar, Row, Col, Button, Carousel, Offcanvas } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
/*Routes : 
* Route : 페이지  <Route path="/detail" element={<div></div>}/>
* Link : 페이지 이동 <Link to="/detail">상세페이지</Link> 
*/
import Detail from './pages/Detail/Detail.js';
import Cart from './pages/Cart/Cart.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/Login/Signup';

import mainImg from './assets/img/mainImg.png'
import first from './assets/img/firstcarousel.jpg'
import second from './assets/img/secondcarousel.jpg'
import third from './assets/img/thirdcarousel.jpg'
import proImg0 from './assets/img/proImg0.webp'
import proImg1 from './assets/img/proImg1.webp'
import proImg2 from './assets/img/proImg2.webp'
import proImg3 from './assets/img/proImg3.webp'
import proImg4 from './assets/img/proImg4.webp'
import proImg5 from './assets/img/proImg5.webp'
import proImg6 from './assets/img/proImg6.webp'
import proImg7 from './assets/img/proImg7.webp'
import proImg8 from './assets/img/proImg8.webp'
import proImg9 from './assets/img/proImg9.webp'
import proImg10 from './assets/img/proImg10.webp'
import proImg11 from './assets/img/proImg11.webp'
import proImg12 from './assets/img/proImg12.webp'
import proImg13 from './assets/img/proImg13.webp'
import proImg14 from './assets/img/proImg14.webp'
import proImg15 from './assets/img/proImg15.webp'
/* import proImg5 from './img/proImg5.webp' */

function console(a) {
  console.log(a);
};
function App() {
  let proImg = [proImg0, proImg1, proImg2, proImg3, proImg4, proImg5, proImg6, proImg7, proImg8, proImg9, proImg10, proImg11, proImg12, proImg13, proImg14, proImg15]

  let [newproImg, setProImg] = useState([])
  //클릭한 상품 상세페이지로 이동
  let [click, setClick] = useState(JSON.parse(sessionStorage.getItem('watch')));

  let navigate = useNavigate();

  //로딩중 UI
  let [loading, setLoding] = useState(true);

  //최근 본 상품
  let [show, setShow] = useState(false)
  let handleClose = () => setShow(false)
  let handleShow = () => setShow(true)

  //db에서 상품 데이터 가져오기
  let [shoes, setShoes] = useState([]);

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem("watch"))
    if (!storedData) {
      localStorage.setItem("watch", JSON.stringify([]))     //최근 본 상품
    }

    async function getProduct() {
      try {
        let res = await axios.get('http://localhost:4000/api/product')
        setShoes(res.data)
        shoes.map(function (a, i) {
          let copy = newproImg
          copy.push('proImg' + i)
          setProImg(copy)
        })
        setLoding(false)
      } catch (error) {
        console.log('데이터 가져오기 실패')
        setLoding(false)
      }
    }
    getProduct();
  }, []) //[]가 비어있으면 mount 될 때만 코드 실행, mount가 되면 localStorage에 데이터 입력

  return (
    <div className='App'>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>최근 본 상품</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>{JSON.parse(localStorage.getItem('watch')) + ' '}</p>
        </Offcanvas.Body>
      </Offcanvas>

      <Routes>
        <Route path="/" element={
          <>
            <div style={{ backgroundImage: 'linear-gradient(to bottom, #4A55A2, #C5DFF8)' }}>
              <div className='mainmenu'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', marginLeft: '30px' }}>
                    <Link to='/' style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>ShoeShop</Link>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
                    <Link to="/cart" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Cart</Link>
                    <Link to="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>About</Link>
                    <Link to="/event" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Event</Link>

                  </div>
                </div>
                <div style={{ marginRight: '30px' }}>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Loigin</Link>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Signup</Link>
                  <button className="shadow__btn" onClick={handleShow}>최근 본 상품</button>
                </div>
              </div>

              {/* <ControlledCarousel /> */}
              <div className='mainItem'>
                <div style={{ color: 'white', textAlign: 'left' }}>
                  <h1>어서오세요</h1>
                  <h1>신발 쇼핑몰 입니다</h1>
                </div>
                <img src={mainImg} style={{ width: '50%', height: '100%' }} />
              </div>
            </div>

            <div className='category'>
              <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#4A55A2' }}>CATEGORY</div>
              <div className='categoryCard'>
                <div class="card shadow"></div>
                <div class="card shadow"></div>
                <div class="card shadow"></div>
              </div>
            </div>

            <div style={{ background: '#C5DFF8' }}>
              <Container style={{ padding: '30px 0' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#4A55A2', marginBottom: '30px' }}>PRODUCT</div>
                <Row>
                  {
                    loading
                      ? <div className="alert alert-warning">로딩중...</div>
                      : shoes.map(function (a, i) {
                        return (
                          < Card shoes={shoes[i]} i={i} setClick={setClick} navigate={navigate} a={a} proImg={proImg} />
                        )
                      })
                  }
                </Row>

              </Container>
            </div>
          </>
        } />

        <Route path="/detail/:id" element={
          <>
            <NavMenu handleShow={handleShow} />
            <Detail click={click} shoes={shoes} setShoes={setShoes} />
          </>
        } />
        <Route path="/cart" element={
          <>
            <NavMenu handleShow={handleShow} />
            <Cart />
          </>
        } />
        <Route path="/about" element={<About navigate={navigate} />}>
          <Route path="member" element={<div>구성원</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>
        <Route path="/event" element={<Event navigate={navigate} />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </div>

  );
}

function Card(props) {
  let j = props.i + 1;

  function goPage() {
    props.setClick(props.i);
  }
  return (
    <>
      <Col sm={3} key={(props.shoes.proId)} style={{ display: 'flex', justifyContent: 'center' }}>
        <div class="card" onClick={() => { props.navigate('/detail/' + props.i) }}>
          <div class="image"> <img src={props.proImg[props.i]} width={'90%'} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span class="title">{props.a.proName}</span>
            <span class="price">{props.a.proPrice}원</span>
          </div>
        </div>
      </Col>

      {/* <Col sm={4} key={(props.shoes.proId)}>
        <img src={props.proImg[props.i]} width={'80%'} />
        <h4 onClick={() => { props.navigate('/detail/' + props.i) }}>{props.a.proName}</h4>
        <p>{props.a.proPrice}원</p>
      </Col> */}
    </>
  )
}
function NavMenu(props) {
  return (
    <div className='navmenu'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginLeft: '30px' }}>
          <Link to='/' style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>ShoeShop</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Cart</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>About</Link>
          <Link to="/event" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Event</Link>
        </div>
      </div>
      <div style={{ marginRight: '30px' }}>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>Loigin</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', margin: '0 30px' }}>SignUp</Link>
        <button class="shadow__btn" onClick={props.handleShow}>최근 본 상품</button>
      </div>
    </div >
  )
}

function About(props) {
  return (
    <div>
      <h4>회사정보</h4>
      <Col>
        <Button variant="dark" onClick={() => { props.navigate('/about/member') }}>member</Button>
        <Button variant="dark" onClick={() => { props.navigate('/about/location') }}>Location</Button>
      </Col>
      <Outlet></Outlet>
    </div>
  )
}

function Event(props) {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Col>
        <Button variant="dark" onClick={() => { props.navigate('/event/one') }}>one</Button>
        <Button variant="dark" onClick={() => { props.navigate('/event/two') }}>two</Button>
      </Col>
      <Outlet></Outlet>
    </div>
  )
}

function ControlledCarousel() {
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  let [index, setIndex] = useState(0);
  let carousel = [first, second, third];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        carousel.map(function (a, i) {
          return (
            <Carousel.Item /* style={{ backgroundImage: 'url(' + a + ')', height: '400px' }} */>
              <img
                className="d-block w-100"
                src={a}
                alt={`${i + 1} slide`}
              />
              <Carousel.Caption>
                <h3> slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}

export default App;
