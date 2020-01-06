import React, {useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {setPageTitle} from './store/actions/actionCreators';
// import {withRouter} from "react-router";
import styles from './app.scss';

interface IAppProps {
    title: string,
    setPageTitle: Function
}

const App: React.FC<IAppProps> = (props:IAppProps) => {
    const {title, setPageTitle} = props;
    useEffect(()=>{
        // eslint-disable-next-line react/prop-types
        document.title = title;
        // eslint-disable-next-line react/prop-types
    },[title]);

    return(
        <div className={styles.a}>
            <section onClick={()=>setPageTitle('66666')}>
                {title}
            </section>
            <footer>
                <div>
                    <i/>
                    <span></span>
                </div>
            </footer>
        </div>
    );
};


function mapStateToProps(state: any) {
    return ({title: state.title});
}
function mapDispatchToProps(dispatch: any) {
    return {
        setPageTitle: bindActionCreators(setPageTitle, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
