import {createStore, applyMiddleware} from "redux";

import reducers from "./reducers";
// @ts-ignore
import thunk from 'redux-thunk';
// @ts-ignore
export default createStore(
    reducers,
    applyMiddleware(thunk)
);
