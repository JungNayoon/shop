import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import '../../App.css'
import { addItem } from "../../store.js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './Detail.css'

function Detail(props) {
    let { id } = useParams();
    let j = parseFloat(id) + 1;

    //db에서 상품 데이터 가져오기
    let [shoes, setShoes] = useState([]);

    /*10초 할인 타이머 만들기 */
    let [sec, setSec] = useState(parseInt(10));
    let [show, setShow] = useState(true);
    // useEffect 만들기 (요즘 방식)
    useEffect(() => {
        //mount, undate 될 때 실행될 코드
        let countdown = setInterval(() => {
            if (parseInt(sec) > 0) {
                setSec(parseInt(sec) - 1);
            }
            if (parseInt(sec) === 0) {
                clearInterval(countdown);
                setShow(false);
            }
        }, 1000);

        /*최근 본 상품 등록 */
        let addWatch = JSON.parse(localStorage.getItem('watch'))
        addWatch.push(props.shoes[id].proName)
        addWatch = new Set(addWatch)    //array에서 중복 제거
        addWatch = Array.from(addWatch) //중복 제거한 것을 다시 Array형태로 바꿈
        localStorage.setItem('watch', JSON.stringify(addWatch))

        async function getProduct() {
            try {
                let res = await axios.get('http://localhost:4000/api/product')
                setShoes(res.data)
            } catch (error) {
                console.log('데이터 가져오기 실패')
            }
        }
        getProduct();
        getQnaList();
        getReviewList();

        return () => clearInterval(countdown);
    }, [sec])

    /*탭 UI */
    let [tab, setTab] = useState(0);

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
            axios.post('http://localhost:4000/api/cart/post', {
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

    /*상품 문의 작성 */
    let [qnaData, setQnaData] = useState({
        proId: id,
        qnaCategory: '',
        qnaContents: '',
        qnaWriter: ''
    })
    let getQnaData = (e) => {
        setQnaData({
            ...qnaData,
            [e.target.name]: e.target.value
        })
    }
    let addQna = () => {
        if (qnaData.qnaCategory === '') {
            alert('문의 유형을 선택하세요.')
        } else if (qnaData.qnaWriter === '') {
            alert('작성자를 입력하세요.')
        } else if (qnaData.qnaContents === '') {
            alert('문의 내용을 입력하세요.')
        } else {
            axios.post('http://localhost:4000/api/qna/post', {
                proId: qnaData.proId,
                qnaCategory: qnaData.qnaCategory,
                qnaContents: qnaData.qnaContents,
                qnaWriter: qnaData.qnaWriter
            })
                .then((res) => {
                    console.log(res);
                    alert('상품 문의 등록 완료!');
                    getQnaList();
                })
                .catch((err) => {
                    console.log(err);
                    alert('상품 문의 등록 실패');
                })
        }
    }

    /*상품 문의 리스트 가져오기 */
    let [filterList, setFilterList] = useState([]);
    async function getQnaList() {
        try {
            let res = await axios.get('http://localhost:4000/api/qna/get');
            let getList = res.data;

            let filteredList = getList.filter((list) => list.proId === shoes[id].proId);
            setFilterList(filteredList);

        } catch (error) {
            console.log('상품 문의 리스트를 가져오기 실패');
            console.log(error);
        }
    }

    /*상품평 작성*/
    let [reviewData, setReviewData] = useState({
        proId: id,
        reviewContents: '',
        reviewWriter: ''
    });

    let getReviewData = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value
        })
    }

    let addReview = () => {
        if (reviewData.reviewContents == null) {
            alert('상품평 내용을 입력하세요.')
        } else if (reviewData.reviewWriter == null) {
            alert('상품평 작성자를 입력하세요.')
        } else {
            axios.post('http://localhost:4000/api/review/post', {
                proId: reviewData.proId,
                reviewContents: reviewData.reviewContents,
                reviewWriter: reviewData.reviewWriter
            })
                .then((res) => {
                    alert('상품평 등록 완료');
                    console.log(res);
                })
                .catch((error) => {
                    alert('상품평 등록 실패');
                    console.log(error);
                })
        }
    }

    /*상품평 출력 */
    let [reviewFilterList, setReviewFilterList] = useState([]);
    async function getReviewList() {

        try {
            let res = await axios.get('http://localhost:4000/api/review/get');
            let getList = res.data;

            let reviewfilteredList = getList.filter((list) => list.proId === shoes[id].proId);
            setReviewFilterList(reviewfilteredList);
            console.log(reviewFilterList);

        } catch (error) {
            console.log('상품평 가져오기 실패');
            console.log(error);
        }
    }


    return (
        <div className={"container start " + fade2} style={{ padding: '60px 0' }}>

            <div className="row">
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={require('../../assets/img/proImg' + id + '.webp')} width={'70%'} />
                </div>

                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <h4 className="pt-5">{props.shoes[id].proName}</h4>  {/* 현재 url에 입력한 숫자 */}
                    <p>{props.shoes[id].proDetail}</p>
                    <p>{props.shoes[id].proPrice} 원</p>
                    <input type="number" min={1} name="count" onChange={getData} placeholder="수량을 입력하세요" style={{ padding: '12px', border: 'none', borderRadius: '4px', boxShadow: '2px 2px 7px 0 rgb(0, 0, 0, 0.2)', outline: 'none', color: 'dimgray' }} />
                    <div><button className="cartbtn" onClick={addCart} style={{ marginTop: '30px' }}>장바구니에 넣기</button></div>

                    {
                        show === true
                            ? <div className="alert alert-warning" style={{ width: '200px', marginTop: '10px' }}>
                                깜짝 20% 할인 쿠폰<br />
                                {sec}초<br />
                                <button onClick={() => {
                                    alert('쿠폰 받기 완료!');
                                    setShow(false);
                                }} style={{ borderColor: '#ffe69c' }}>쿠폰 받기</button>
                            </div>
                            : null
                    }
                </div>

                <Nav variant="tabs" defaultActiveKey="link-1" style={{ marginTop: '50px' }}>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => { setTab(0) }}>상품평</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" onClick={() => { setTab(1) }}>상품문의</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} shoes={props.shoes} id={id} getQnaData={getQnaData} addQna={addQna} filterList={filterList} getReviewData={getReviewData} addReview={addReview} reviewFilterList={reviewFilterList} />

            </div>
        </div>
    )
}


function TabContent({ tab, shoes, id, getQnaData, addQna, filterList, getReviewData, addReview, reviewFilterList }) {

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
                <>
                    <div className="form">
                        <div className="title">상품평 작성</div>
                        <div className="formContents">
                            <input type="text" placeholder="작성자" className="input" name="reviewWriter" onChange={getReviewData} style={{marginBottom: '15px'}}/>
                            <textarea placeholder="상품평을 작성해주세요" name="reviewContents" onChange={getReviewData}></textarea>
                        </div>

                        <button style={{ background: '#4A55A2' }} onClick={addReview}>작성완료</button>
                    </div>
                    <div className="reviewList">
                        <ul>
                            {
                                reviewFilterList.map((a, i) => {
                                    return (
                                        <li key={i}>
                                            <div style={{ marginBottom: '30px' }}>
                                                <span style={{ marginRight: '30px' }}>{reviewFilterList[i].reviewWriter}</span>
                                                <span>{reviewFilterList[i].reviewDate}</span>
                                            </div>
                                            <div><span>{reviewFilterList[i].reviewContents}</span></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </>


                ,
                <>
                    <div className="form">
                        <div className="title">상품문의 작성</div>
                        <div className="formContents">
                            <div>
                                <select name='qnaCategory' onChange={getQnaData}>
                                    <option disabled selected>문의유형</option>
                                    <option value='배송'>배송</option>
                                    <option value='상품'>상품</option>
                                    <option value='반품/취소'>반품/취소</option>
                                    <option value='기타'>기타</option>
                                </select>
                                <input type="text" placeholder="작성자" className="input" name='qnaWriter' onChange={getQnaData} />
                            </div>
                            <textarea placeholder="문의 내용을 작성해주세요" name='qnaContents' onChange={getQnaData}></textarea>
                        </div>

                        <button style={{ background: '#4A55A2' }} onClick={addQna}>작성완료</button>
                    </div>
                    <div className="reviewList">
                        <table style={{ width: '100%', margin: '30px 0' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>문의유형</th>
                                    <th style={{ width: '50%' }}>문의내용</th>
                                    <th style={{ width: '20%' }}>작성자</th>
                                    <th style={{ width: '20%' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    filterList.map((a, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{filterList[i].qnaCategory}</td>
                                                <td>{filterList[i].qnaContents}</td>
                                                <td>{filterList[i].qnaWriter}</td>
                                                <td>{filterList[i].qnaDate}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            ][tab]}
        </div>
    )
}

export default Detail;