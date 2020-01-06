import initState from "./states";
import {combineReducers} from "redux";
import {
    WRITE_TITLE
} from './actions/actionTypes';

const title = (state: string = initState.title, action: { type: string, title: string }) => {
    switch (action.type) {
        case WRITE_TITLE:
            return action.title;
        default:
            return state;
    }
};

export default combineReducers({
    title
});
