import React from 'react';
import {Button, Card, Collapsible, CollapsibleItem, Collection, CollectionItem, Input, Row} from 'react-materialize'
import {Link, NavLink} from "react-router-dom";
import store from '../store/globalstore'
import {updateOperatingSystem} from "../actions/global/global";
import {connect} from "react-redux";

let Home = ({dispatch}) => (

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
            <div className="col-md-6">
                <Collapsible accordion>
                    <CollapsibleItem header='Settings' icon='filter_drama'>
                        <Row>
                        <Input s={12} m={12} type='select' label="Server Operating System" id={"what-is-server-os"}
                               onChange={(e) => {
                                   store.dispatch(updateOperatingSystem(e.target.value))
                               }}>
                            <option value={'Linux'}>Linux</option>
                            <option value={'Windows'}>Windows</option>
                        </Input>
                        </Row>
                    </CollapsibleItem>
                    <CollapsibleItem header='Second' icon='place'>
                        Lorem ipsum dolor sit amet.
                    </CollapsibleItem>
                    <CollapsibleItem header='Third' icon='whatshot'>
                        Lorem ipsum dolor sit amet.
                    </CollapsibleItem>
                </Collapsible>
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

Home = connect()(Home);
export default Home;