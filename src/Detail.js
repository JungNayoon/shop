import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import './App.css'
import { addItem } from "./store.js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function Detail(props) {
    let { id } = useParams();
    let j = parseFloat(id) + 1;

    //db에서 상품 데이터 가져오기
    let [shoes, setShoes] = useState([]);

    /*2초 할인 타이머 만들기 */
    let [show, setShow] = useState(true);
    // useEffect 만들기 (요즘 방식)
    useEffect(() => {
        //mount, undate 될 때 실행될 코드
        let timer = setTimeout(() => {
            setShow(false);
        }, 2000);   // 2초 후에 show = false

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
    }, [])

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
                proId : cartData.proId,
                proName : cartData.proName,
                count : cartData.count
            })
            .then((res) => {
                console.log(res)
                alert('장바구니 추가 완료!')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    return (
        <div className={"container start " + fade2} style={{ padding: '70px 0' }}>

            {
                show === true
                    ? <div className="alert alert-warning">
                        2초 이내 구매시 할인<br />
                        <button>할인받기</button>
                    </div>
                    : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + j + ".jpg"} width="100%" />
                </div>

                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].proName}</h4>  {/* 현재 url에 입력한 숫자 */}
                    <p>{props.shoes[id].proDetail}</p>
                    <p>{props.shoes[id].proPrice}</p>
                    <input type="number" min={1} name="count" onChange={getData} />
                    {/*                     <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ proId: props.shoes[id].proId, proName: props.shoes[id].proName, count: 1 }))
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        console.log(s.stock2)
                    }}>장바구니에 들어갔는지 콘솔 확인</button>
                    <Link to={"/cart"}>장바구니</Link> */}

                    <button className="btn btn-danger" onClick={()=>{
                        console.log(cartData)
                    }}>장바구니데이터 확인</button>
                    <button className="btn btn-danger" onClick={addCart}>장바구니에 넣기</button>
                </div>

                {/* input 태그에 숫자만 넣기 */}
                <div className="alert alert-warning">
                    {
                        word === true
                            ? <div className="alert alert-danger">경고 : 숫자만 입력하세요</div>
                            : null
                    }
                    <input type="text" onChange={(e) => {
                        console.log(e.target.value);    //숫자 1입력
                        let a = e.target.value;         //a=1
                        isNaN(a);   // isNaN: 숫자가 아닌가? -> false
                        setWord(isNaN(a)); // Num을 false로 바꾼다
                    }} />
                </div>

                <Nav variant="tabs" defaultActiveKey="/link-1">
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => { setTab(0) }}><div>상세설명</div></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" onClick={() => { setTab(1) }}>상품평</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3" onClick={() => { setTab(2) }}>상품문의</Nav.Link>
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
            {[<><div>{shoes[id].title}</div> <div>{shoes[id].content}</div> <div>{shoes[id].price}</div></>
                , <div>내용2</div>
                , <div>내용3</div>][tab]}
        </div>
    )
}

export default Detail;