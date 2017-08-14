/**
 * Created by Troy on 8/12/2017.
 */
import React, {Component} from 'react'
import {Row, Input, Card, Col, Button} from 'react-materialize'
import Select from 'react-select';
import CreatableDemo from './CreateableDemo';
import 'react-select/dist/react-select.css';

const ImgurScraperForm = ({imgurscraper,  onChangeValue}) =>
    (
        <div className="appContainer">
            <CreatableDemo onChangeValue={(value) => {onChangeValue(value)}}/>

        </div>
    );


export default ImgurScraperForm
