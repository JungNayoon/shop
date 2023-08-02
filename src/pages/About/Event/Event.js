function Event() {
    return (
        <div className='contents' style={{ borderTop: '1px solid #eeeeee', display: 'flex' }}>
            <div style={{ borderRight: '1px solid #eeeeee', flexGrow: '1', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px 0 30px 20px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>이벤트</span>
                <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0', marginTop: '30px' }}>
                    <li style={{ paddingBottom: '15px' }}>이벤트</li>
                    <li style={{ paddingBottom: '15px' }}>이벤트당첨</li>
                </ul>
            </div>
            <div style={{ flexGrow: '3', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                <table style={{ borderTop: '2px solid black', width: '90%', fontWeight: 'bold' }}>
                    <thead style={{ borderBottom: '2px solid black' }}>
                        <td>제목</td>
                        <td>게시일</td>
                    </thead>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[발표] 『여행빅페스타-해외 왕복항공권 100원 응모딜』 이벤트 당첨자</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[발표] 『여행빅페스타-해외 왕복항공권 100원 응모딜』 이벤트 당첨자</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[발표] 『여행빅페스타-해외 왕복항공권 100원 응모딜』 이벤트 당첨자</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Event;
