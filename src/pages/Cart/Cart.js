import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeCount } from "../../store.js"
import { increase } from "../../store/userSlice.js";
import { useEffect, useState } from "react";
import axios from "axios";

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

    /*장바구니 삭제 기능 */
    /* let deleteCart = () => {
        axios.delete('http://localhost:4000/api/cart/delete', {
            proId : cart[i].proId
        })
        .then((res) => {
            console.log(res)
            alert("삭제 완료")
        })
        .catch((err) => {
            console.log(err)
        })
    }
 */
    return (
        <div style={{marginTop:'30px', padding: '0 60px'}}>
            <div style={{textAlign:'center', fontSize:'30px', color:'#4A55A2', fontWeight:'bold', marginBottom:'30px'}}>장바구니</div>
            <Table striped bordered hover style={{ "vertical-align": "middle" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
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
                                    <td>{i+1}</td>
                                    <td><Link to={"/detail/" + cart[i].proId}>{cart[i].proName}</Link></td>
                                    <td>{cart[i].count}</td>
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

                    {/* {
                        s.stock2.map((a, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><Link to={"/detail/" + s.stock2[i].id}>{s.stock2[i].name}</Link></td>
                                <td>{s.stock2[i].count}</td>
                                <td>
                                    <Button variant="dark" onClick={() => {
                                        dispatch(changeCount(s.stock2[i].id))
                                    }}>+</Button>
                                </td>
                            </tr>
                        )
                    } */}

                </tbody>
            </Table >
        </div>
    )
}

export default Cart;