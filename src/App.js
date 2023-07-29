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
import Detail from './Detail.js';
import Cart from './Cart.js';
import first from './img/firstcarousel.jpg'
import second from './img/secondcarousel.jpg'
import third from './img/thirdcarousel.jpg'
import proImg0 from './img/proImg0.webp'
import proImg1 from './img/proImg1.webp'
import proImg2 from './img/proImg2.webp'
import proImg3 from './img/proImg3.webp'
import proImg4 from './img/proImg4.webp'
/* import proImg5 from './img/proImg5.webp' */

function console(a) {
  console.log(a);
};
function App() {
  let proImg = [proImg0, proImg1, proImg2, proImg3, proImg4]
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
    //sessionStorage.setItem("watch2", JSON.stringify([]))
    let storedData = JSON.parse(localStorage.getItem("watch"))
    if(!storedData){
      localStorage.setItem("watch", JSON.stringify([]))     //최근 본 상품
    }
    
    async function getProduct() {
      try {
        let res = await axios.get('http://localhost:4000/api/product')
        setShoes(res.data)
        setLoding(false)
      } catch (error) {
        console.log('데이터 가져오기 실패')
        setLoding(false)
      }
    }
    getProduct();
  }, []) //[]가 비어있으면 mount 될 때만 코드 실행, mount가 되면 localStorage에 데이터 입력

  return (
    <dF iv className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/detail">Detail</Nav.Link> */}
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/event">Event</Nav.Link>
          </Nav>
          <Button variant="warning" onClick={handleShow}>최근 본 상품</Button>
        </Container>
      </Navbar>

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
            <ControlledCarousel />
            <Container style={{ padding: '30px 0' }}>
              <Row>
                {
                  loading
                    ? <div className="alert alert-warning">로딩중...</div>
                    : shoes.map(function (a, i) {
                      return (
                        < Card shoes={shoes[i]} i={i} setClick={setClick} navigate={navigate} a={a} proImg={proImg}/>
                      )
                    })
                }
              </Row>

              {
                loading
                  ? <div className="alert alert-warning">로딩중...</div>
                  : null
              }
            </Container>
          </>
        } />

        <Route path="/detail/:id" element={<Detail click={click} shoes={shoes} setShoes={setShoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About navigate={navigate} />}>
          <Route path="member" element={<div>구성원</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>
        <Route path="/event" element={<Event navigate={navigate} />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </dF>

  );
}

function Card(props) {
  let j = props.i + 1;

  function goPage() {
    props.setClick(props.i);
  }
  return (
    <Col sm={4} key={(props.shoes.proId)}>
      <img src={props.proImg[props.i]} width={'80%'}/>
      {/* <img src={require('./img/proImg'+ props.i +'.webp').default} width={'80%'}></img> */}
      {/* <img src={"https://codingapple1.github.io/shop/shoes" + j + ".jpg"} width={'80%'}></img> */}
      <h4 onClick={() => { props.navigate('/detail/' + props.i) }}>{props.a.proName}</h4>
      <p>{props.a.proPrice}원</p>
    </Col>
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
            <Carousel.Item style={{ backgroundImage: 'url(' + a + ')', height: '400px' }}>
              {/* <img
                className="d-block w-100"
                src={a}
                alt={`${i + 1} slide`}
              /> */}
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
