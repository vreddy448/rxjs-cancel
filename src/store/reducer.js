import { combineReducers } from "redux";

export const appReducer = (state = { }, action) => {

    switch (action.type) {
        
        case "REDUX_ACTION": {
            return {...state, ...action.payload}
        }
        case "DUMMY_REDUX_ACTION": {
            return {...state, batchData: {...action.payload}}
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    app: appReducer,
});

export default rootReducer;