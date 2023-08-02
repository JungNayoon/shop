import '../Ask/Ask.css'

function Ask() {
    return (
        <div className='contents' style={{ borderTop: '1px solid #eeeeee', display: 'flex' }}>
            <div style={{ borderRight: '1px solid #eeeeee', flexGrow: '1', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px 0 30px 20px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>1:1 상담</span>
                <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0', marginTop: '30px' }}>
                </ul>
            </div>

            <div style={{ flexGrow: '3', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
                <div class="askCard">

                    <form class="askForm">
                        <div class="group">
                            <input type="text" required="" />
                            <label>성함</label>
                        </div>
                        <div class="group">
                            <input type="email" id="email" name="email" required="" />
                            <label>Email</label>
                        </div>
                        <div class="group">
                            <input type="text" required="" />
                            <label>문의 제목</label>
                        </div>
                        <div class="group">
                            <textarea id="comment" name="comment" rows="5" required=""></textarea>
                            <label>문의 내용</label>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Ask;