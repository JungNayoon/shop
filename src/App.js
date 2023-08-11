/* eslint-disable */
import './App.css';
import './pages/About/About.css';
import { Container, Row, Col, Button, Carousel, Offcanvas, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Question, Bell, Stars } from 'react-bootstrap-icons';
/*Routes : 
* Route : 페이지  <Route path="/detail" element={<div></div>}/>
* Link : 페이지 이동 <Link to="/detail">상세페이지</Link> 
*/
import NavMenu from './components/NavMenu';
import Detail from './pages/Detail/Detail.js';
import Cart from './pages/Cart/Cart.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/Login/Signup.js';
import Notice from './pages/About/Notice/Notice';
import Ask from './pages/About/Ask/Ask.js';
import Event from './pages/About/Event/Event';
import ScrollTop from './components/ScrollTop';

import mainImg from './assets/img/mainImg.png';



function App() {

  //클릭한 상품 상세페이지로 이동, localStorage에 저장
  let [click, setClick] = useState(JSON.parse(sessionStorage.getItem('watch')));

  let navigate = useNavigate();

  //로딩중 UI
  let [loading, setLoding] = useState(true);

  //최근 본 상품
  let [show, setShow] = useState(false);
  let [watchItem, setWatchItem] = useState(JSON.parse(localStorage.getItem('watch')));
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);
  let [recentProId, setRecentProId] = useState([]);

  //db에서 상품 데이터 가져오기
  let [shoes, setShoes] = useState([]);

  useEffect(() => {
    // 최근 본 상품
    let storedData = JSON.parse(localStorage.getItem("watch"));
    if (!storedData) {
      localStorage.setItem("watch", JSON.stringify([]));
    };
    console.log(storedData);
    async function getProduct() {
      try {
        // DB에서 상품 데이터 가져오기
        let res = await axios.get('http://localhost:4000/api/product');
        setShoes(res.data);
        setLoding(false);

        // 최근 본 상품 목록 가져오기
        let recentProducts = [];
        watchItem.forEach(element => {
          let foundShoes = res.data.find((shoes) => shoes.proName === element);
          if (foundShoes) {
            recentProducts.push(foundShoes.proId);
          }
        });
        setRecentProId(recentProducts);
      } catch (error) {
        console.log('데이터 가져오기 실패');
        setLoding(false);
        console.log(error);
      }
    }
    getProduct();
  }, []);

  // 상품 이름 클릭과 동시에 watchItem 업데이트하기
  let updateWatchItem = (proName) => {
    let copy = [...watchItem, proName];
    copy = [...new Set(copy)];
    setWatchItem(copy);
    console.log(watchItem);
  }

  return (
    <div className='App'>

      {/* <Watch show={show} handleClose={handleClose} shoes={shoes}/> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: '35px' }}>최근 본 상품</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ul style={{ padding: '0', fontSize: '20px' }}>
              {
                watchItem.map((a, i) => {
                  return (
                    <>
                      <li className='proName' onClick={() => {
                        navigate('/detail/' + recentProId[i])
                        handleClose();
                      }}>{watchItem[i]}</li>
                    </>
                  )
                })
              }
            </ul>
          </div>
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
                  <button className="shadow__btn" onClick={handleShow}>최근 본 상품</button>
                </div>
              </div>

              <div className='mainItem'>
                <div style={{ color: 'white', textAlign: 'left' }}>
                  <h1>어서오세요</h1>
                  <h1>신발 쇼핑몰 입니다</h1>
                </div>
                <img src={mainImg} style={{ width: '50%', height: '100%' }} />
              </div>
            </div>

            <div className='carouselBox'>
              <ControlledCarousel />
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
                          < Card shoes={shoes[i]} i={i} setClick={setClick} navigate={navigate} a={a} updateWatchItem={updateWatchItem}/*  proImg={proImg} */ />
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
            <ScrollTop/>
            <NavMenu handleShow={handleShow} />
            <Detail click={click} shoes={shoes} setShoes={setShoes} />
          </>
        } />

        <Route path="/about" element={
          <>
            <NavMenu handleShow={handleShow} />
            <About navigate={navigate} />
          </>
        }>
          <Route path="notice" element={<Notice />} />
          <Route path="ask" element={<Ask />} />
          <Route path="event" element={<Event />} />
        </Route>

        <Route path="/cart" element={
          <>
            <NavMenu handleShow={handleShow} />
            <Cart />
          </>
        } />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
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
        <div class="card" onClick={() => { props.navigate('/detail/' + props.i); props.updateWatchItem(props.a.proName); }}>
          <div class="image"> <img src={require('../src/assets/img/proImg' + props.i + '.webp')} width={'90%'} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span class="title">{props.a.proName}</span>
            <span class="price">{props.a.proPrice}원</span>
          </div>
        </div>
      </Col>

    </>
  )
}

function About(props) {
  return (
    <div style={{ marginTop: '30px', padding: '0 60px' }}>
      <div style={{ textAlign: 'center', fontSize: '30px', color: '#4A55A2', fontWeight: 'bold', marginBottom: '30px' }}>고객센터</div>
      <Col>
        <Button className='navBtn' onClick={() => { props.navigate('/about/notice') }}><Bell style={{ fontSize: '40px' }} /><div>공지사항</div></Button>
        <Button className='navBtn' onClick={() => { props.navigate('/about/ask') }}><Question style={{ fontSize: '40px' }} /><div>1:1 상담</div></Button>
        <Button className='navBtn' onClick={() => { props.navigate('/about/event') }}><Stars style={{ fontSize: '40px' }} /><div>이벤트</div></Button>
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
  let carousel = [1, 2, 3];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        carousel.map(function (a, i) {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require('../src/assets/img/carousel' + (i + 1) + '.jpg')}
                alt={'${i + 1} slide'}
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
