import React from "react";
import CreatableDemo from "./CreateableDemo";
import "react-select/dist/react-select.css";

const ImgurScraperForm = ({imgurscraper,  onChangeValue}) =>
    (
        <div className="appContainer">
            <CreatableDemo onChangeValue={(value) => {onChangeValue(value)}}/>

        </div>
    );


export default ImgurScraperForm
