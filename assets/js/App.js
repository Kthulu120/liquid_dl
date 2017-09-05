// this component will be rendered by our <___Router>
import React from "react";
import Main from "./Components/Main";
import Header from "./Components/Header";
import "../css/materialize.css";
import "../css/main.css";


const App = () => (
    <div className="container-fluid">
        <div className="row container-row">
            <div className="row container-row">

                <Header/>

                <Main />
            </div>
        </div>
    </div>
);

export default App