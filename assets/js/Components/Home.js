import React from 'react';
import {Button, Collection, CollectionItem} from 'react-materialize'
import {Link, NavLink} from "react-router-dom";

const Home = () => (
    <div className="appContainer">
        <h2>Welcome To Liquid-dl</h2>
        <div className="row">
            <div className="col-md-6">
                <Collection>
                    <CollectionItem><NavLink to='/help'>Tips and Help</NavLink></CollectionItem>
                    <CollectionItem>Star On GitHub</CollectionItem>
                    <CollectionItem>Suggest Features (I'll get back to you in a day or two)</CollectionItem>
                </Collection>
            </div>
        </div>
        <Button floating fab='horizontal' faicon='fa fa-archive nav-icon' className='red' large
                style={{bottom: '45px', right: '24px'}}>
            <Button floating className='red'><i className="fa fa-archive"/></Button>
            <Button floating icon='format_quote' className='yellow darken-1'/>
            <Button floating icon='publish' className='green'/>
            <Button floating icon='attach_file' className='blue'/>
        </Button>
    </div>
);

export default Home