import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import './App.css'
import { addItem } from "./store.js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './Detail.css'

import proImg from './img/proImg0.webp'
import thumbnail1 from './img/thumbnail1.webp'
import thumbnail2 from './img/thumbnail2.webp'
import thumbnail3 from './img/thumbnail3.webp'
import thumbnail4 from './img/thumbnail4.webp'

function Detail(props) {
    let { id } = useParams();
    let j = parseFloat(id) + 1;

    //db에서 상품 데이터 가져오기
    let [shoes, setShoes] = useState([]);

    /*2초 할인 타이머 만들기 */
    let [sec, setSec] = useState(parseInt(10));
    let [show, setShow] = useState(true);
    // useEffect 만들기 (요즘 방식)
    useEffect(() => {
        //mount, undate 될 때 실행될 코드
        /* let timer = setTimeout(() => {
            setShow(false);
        }, 10000);   // 10초 후에 show = false */
        let countdown = setInterval(() => {
            if (parseInt(sec) > 0) {
                setSec(parseInt(sec) - 1);
            }
            if (parseInt(sec) === 0) {
                clearInterval(countdown);
                setShow(false);
            }
        }, 1000);
        return () => clearInterval(countdown);
        /*최근 본 상품 등록 */
        let addWatch = JSON.parse(localStorage.getItem('watch'))
        addWatch.push(props.shoes[id].proName)
        addWatch = new Set(addWatch)    //array에서 중복 제거
        addWatch = Array.from(addWatch) //중복 제거한 것을 다시 Array형태로 바꿈
        localStorage.setItem('watch', JSON.stringify(addWatch))
        //localStorage.setItem(props.shoes[id].title)

        async function getProduct() {
            try {
                let res = await axios.get('http://localhost:4000/api/product')
                setShoes(res.data)
            } catch (error) {
                console.log('데이터 가져오기 실패')
            }
        }
        getProduct();
    }, [sec])

    /*input 태그에 숫자만 넣기 */
    let [word, setWord] = useState(false);

    /*탭 UI */
    let [tab, setTab] = useState(1);

    /*페이지로딩 애니메이션 */
    let [fade2, setFade2] = useState('')
    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    })

    /*장바구니에 넣기 */
    let dispatch = useDispatch()
    let s = useSelector((state) => { return state })

    /*DB cart 테이블에 상품정보 넣기 */
    let [cartData, setCartData] = useState({
        proId: props.shoes[id].proId,
        proName: props.shoes[id].proName,
        count: ''
    })
    let getData = (e) => {
        setCartData({
            ...cartData,
            [e.target.name]: e.target.value
        })
    }
    let addCart = () => {
        if (cartData.count === '') {
            alert('수량을 입력하세요!')
        } else {
            axios.post('http://localhost:4000/api/cart/insert', {
                proId: cartData.proId,
                proName: cartData.proName,
                count: cartData.count
            })
                .then((res) => {
                    console.log(res)
                    alert('장바구니 추가 완료!')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className={"container start " + fade2} style={{ padding: '60px 0' }}>

            <div className="row">
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="thumbnail" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: '10px' }}>
                        <div><img src={thumbnail1} /></div>
                        <div><img src={thumbnail2} /></div>
                        <div><img src={thumbnail3} /></div>
                        <div><img src={thumbnail4} /></div>
                    </div>
                    <img src={proImg} width="70%" />
                </div>

                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <h4 className="pt-5">{props.shoes[id].proName}</h4>  {/* 현재 url에 입력한 숫자 */}
                    <p>{props.shoes[id].proDetail}</p>
                    <p>{props.shoes[id].proPrice} 원</p>
                    <input type="number" min={1} name="count" onChange={getData} placeholder="수량을 입력하세요" style={{ padding: '12px', border: 'none', borderRadius: '4px', boxShadow: '2px 2px 7px 0 rgb(0, 0, 0, 0.2)', outline: 'none', color: 'dimgray' }} />
                    <div><button className="cartbtn" onClick={addCart} style={{ marginTop: '30px' }}>장바구니에 넣기</button></div>

                    {
                        show === true
                            ? <div className="alert alert-warning" style={{width:'200px', marginTop:'10px'}}>
                                깜짝 20% 할인 쿠폰<br />
                                {sec}초<br />
                                <button onClick={() => { alert('쿠폰 받기 완료!') }} style={{borderColor:'#ffe69c'}}>쿠폰 받기</button>
                            </div>
                            : null
                    }
                </div>


                <Nav variant="tabs" defaultActiveKey="/link-1" style={{ marginTop: '50px' }}>
                    <Nav.Item>
                        <Nav.Link eventKey="/link-1" onClick={() => { setTab(0) }}>상품평</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/link-2" onClick={() => { setTab(1) }}>상품문의</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} shoes={props.shoes} id={id} />

            </div>
        </div>
    )
}


function TabContent({ tab, shoes, id }) {

    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            {[
                <div className="form">
                    <div className="title">상품평 작성</div>
                    <input type="text" placeholder="닉네임" className="input" />
                    <textarea placeholder="상품평을 작성해주세요"></textarea>

                    <button>작성완료</button>
                </div>
                , <div className="form">
                    <div className="title">상품문의 작성</div>
                    <input type="text" placeholder="닉네임" className="input" />
                    <textarea placeholder="문의 내용을 작성해주세요"></textarea>

                    <button>작성완료</button>
                </div>
            ][tab]}
        </div>
    )
}

export default Detail;