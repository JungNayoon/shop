import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeCount } from "../../store.js"
import { increase } from "../../store/userSlice.js";
import { useEffect, useState } from "react";
import axios from "axios";
import './Cart.css'

function Cart() {

    let s = useSelector((state) => { return state })
    let dispatch = useDispatch()    // store.js로 요청을 보내주는 함수
    let [loading, setLoding] = useState(true)

    /*db에서 카트 데이터 불러오기 */
    let [cart, setCart] = useState([])
    useEffect(() => {
        async function getCart() {
            try {
                let res = await axios.get('http://localhost:4000/api/cart/get')
                setCart(res.data)
                setLoding(false)
            } catch (error) {
                console.log('데이터 가져오기 실패')
                setLoding(false)
            }
        }
        getCart();
    }, [])

    return (
        <div style={{ marginTop: '30px', padding: '0 60px' }}>
            <div style={{ textAlign: 'start', fontSize: '30px', color: '#4A55A2', fontWeight: 'bold', marginBottom: '30px' }}>장바구니</div>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: '2', marginRight: '15px' }}>
                    <Table striped bordered hover style={{ "vertical-align": "middle" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>상품금액</th>
                                <th>변경하기</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading
                                    ? <div className="alert alert-warning">로딩중...</div>
                                    : cart.map((a, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><Link to={"/detail/" + cart[i].proId}>{cart[i].proName}</Link></td>
                                            <td>{cart[i].count}</td>
                                            <td>{(cart[i].proPrice * cart[i].count).toLocaleString()}원</td>
                                            <td>
                                                <Button variant="dark">-</Button>
                                                <Button variant="dark">+</Button>
                                            </td>

                                            <td><Button variant="dark" onClick={() => {
                                                axios.delete("http://localhost:4000/api/cart/delete", {
                                                    data: { cartNum: cart[i].cartNum }
                                                })
                                                    .then((res) => {
                                                        alert("삭제 완료")
                                                        console.log(res)
                                                        window.location.reload()
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }}>삭제</Button></td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </Table >
                </div>

                <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                    <div className="orderInfo">
                        <p className="bold">결제 정보</p>
                        <hr />
                        <ul>
                            <li style={{ paddingBottom: '10px' }}>
                                <span>상품수</span>
                            </li>
                            <li style={{ paddingBottom: '10px' }}>
                                <span>상품금액</span>
                            </li>
                            <li>
                                <span>배송비</span>
                            </li>
                        </ul>
                        <hr />
                        <p className="bold">총 결제금액</p>
                        <button>결제하기</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart;