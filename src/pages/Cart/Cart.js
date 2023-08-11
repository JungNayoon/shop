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
    let [loading, setLoading] = useState(true)

    /*db에서 카트 데이터 불러오기 */
    let [cart, setCart] = useState([])
    let [total, setTotal] = useState(0)
    useEffect(() => {
        async function getCart() {
            try {
                let res = await axios.get('http://localhost:4000/api/cart/get')
                setCart(res.data)
                setLoading(false)
            } catch (error) {
                console.log('데이터 가져오기 실패')
                setLoading(false)
            }
        }

        function totalPrice() {
            let sum = 0;
            cart.map((a, i) => sum += cart[i].proPrice * cart[i].count)
            setTotal(sum)
        }
        totalPrice();
        getCart();
    }, [cart]);

    /* 수량 변경하기 */
    let decrease = async (proId) => {
        try{
            let updateCount = cart.find((cart) => cart.proId == proId).count - 1;
            let updateCartNum = cart.find((cart) => cart.proId == proId).cartNum;

            if(updateCount <= 0){
                await axios.delete('http://localhost:4000/api/cart/delete', {
                    data : { cartNum : updateCartNum }
                })
            } else{
                await axios.put('http://localhost:4000/api/cart/update', {
                    key: "count",
                    value: -1,
                    proId: proId
                })
            }
            window.location.reload();
        } catch(error){
            console.log('수량 업데이트 실패');
        }
    };
    
    let increase = (proId) => {
        try{
            axios.put('http://localhost:4000/api/cart/update', {
                key: "count",
                value: 1,
                proId: proId
            })
            window.location.reload();
        } catch(error){
            console.log('수량 업데이트 실패')
        }
    }


    return (
        <div style={{ marginTop: '30px', padding: '0 60px', height:'100vh'}}>
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
                                            <td><Link className="proNameLink" to={"/detail/" + cart[i].proId}>{cart[i].proName}</Link></td>
                                            <td>{cart[i].count}</td>
                                            <td>{(cart[i].proPrice * cart[i].count).toLocaleString()}원</td>
                                            <td>
                                                <button className="countBtn" onClick={() => decrease(cart[i].proId)}>-</button>
                                                <button className="countBtn" onClick={() => increase(cart[i].proId)}>+</button>
                                            </td>

                                            <td><button className="deleteBtn" onClick={() => {
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
                                            }}>삭제</button></td>
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
                                <span className="listData">{cart.length}개</span>
                            </li>
                        </ul>
                        <hr />
                        <div>
                            <span className="bold">총 결제금액</span>
                            <span className="listData">{total.toLocaleString()}원</span>
                        </div>
                        <button style={{ marginTop: '15px' }}>결제하기</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart;