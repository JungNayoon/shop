import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name: 'user',
    initialState: {name : 'kim', age : 20},
    reducers: {
        changeName(state) {
            //return 'john ' + state
            state.name = 'park' //array나 object의 경우 직접 수정해도 state변경된다.
        },
        increase(state, action){ //action은 state 변경 함수
            state.age += action.payload //action.payload는 파라미터 불러오기
        }
    }
})
export let {changeName, increase} = user.actions

export default user