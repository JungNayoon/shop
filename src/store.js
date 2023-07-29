import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "././store/userSlice"


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

let stock2 = createSlice({
    name: 'stock2',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changeCount(state, action) {
            let 번호 = state.findIndex((a) => { return a.id === action.payload })    //payload와 같은 id를 가진 상품 찾기
            state[번호].count++   //action.payload : 파라미터값
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    }
})
export let { changeCount, addItem } = stock2.actions



export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        stock2: stock2.reducer,
    }
})