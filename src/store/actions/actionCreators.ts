// eslint-disable-next-line no-unused-vars
import {WRITE_TITLE} from './actionTypes';

export const setPageTitle = (title: string) =>{
    return (dispatch: any, getState: any) => dispatch({ type: WRITE_TITLE, title: title });
};
