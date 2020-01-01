import React, {useEffect} from "react";
import styles from "./app.scss";
import logo from "./assets/images/logo192.png";
import newUser from "./assets/images/newUser.jpg";

interface IAppProps {

}

const App: React.FC<IAppProps> = props => {
    useEffect(()=>{
        console.log(props);
        document.title = "App";
    },[props]);
    return(
        <div className={styles.a}>
            你好，HELLOsdfsdfsddfssdfsdffsdfsd
            <img src={logo} alt="你瞅啥"/>
            <img src={newUser} alt="还瞅"/>
            <section>

            </section>
        </div>
    );
};

export default App;
