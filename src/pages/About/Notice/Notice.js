function Notice() {
    return (
        <div className='contents' style={{ borderTop: '1px solid #eeeeee', display: 'flex' }}>
            <div style={{ borderRight: '1px solid #eeeeee', flexGrow: '1', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px 0 30px 20px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>공지사항</span>
                <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0', marginTop: '30px' }}>
                    <li style={{ paddingBottom: '15px' }}>전체</li>
                    <li style={{ paddingBottom: '15px' }}>고객서비스</li>
                    <li style={{ paddingBottom: '15px' }}>배송</li>
                </ul>
            </div>
            <div style={{ flexGrow: '3', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                <table style={{ borderTop: '2px solid black', width: '90%', fontWeight: 'bold' }}>
                    <thead style={{ borderBottom: '2px solid black' }}>
                        <td>제목</td>
                        <td>게시일</td>
                    </thead>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[안내] 해외결제 사칭 문자 주의</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[안내] 해외결제 사칭 문자 주의</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody style={{ borderBottom: '1px solid #9E9E9E', height: '50px', fontWeight: 'normal' }}>
                        <td>[안내] 해외결제 사칭 문자 주의</td>
                        <td>2023.08.02</td>
                    </tbody>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Notice;