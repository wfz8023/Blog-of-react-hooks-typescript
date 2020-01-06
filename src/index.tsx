import * as React from "react";
import { render } from "react-dom";
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
// import Main from "./view/Main";

render(
    <Provider store={ store }>
        <App/>
        {/*<Main/>*/}
    </Provider>
   ,
    document.getElementById('root'));
