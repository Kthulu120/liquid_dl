/**
 * Created by Troy on 8/12/2017.
 */
import React from 'react'
import {
    Row, Input, Card, Col, Button, CollectionItem, Collapsible, CollapsibleItem,
    Collection
} from 'react-materialize'
import {NavLink} from "react-router-dom";
import {QuestionAndAnswers} from '../../../utility/QuestionsAndAnswers'

const HomeComponent = ({server_os, server_port, server_ip, updateOperatingSystem, updateServerPort, updateServerIP}) =>
    (
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
                            <Row> <label> Always Set these when accessing on new browser since it uses localStorage on
                                the browser your using</label> </Row>
                            <Row>
                                <Input s={12} m={12} type='select' label="Server Operating System"
                                       id={"what-is-server-os"}
                                       onChange={(e) => {
                                           updateOperatingSystem(e.target.value)
                                       }} value={server_os}>
                                    <option value={'Linux'}>Linux</option>
                                    <option value={'Windows'}>Windows</option>
                                </Input>
                            </Row>
                            <Row>
                                <Input s={6} label="Server Port Liquid is running on" onChange={(e) => {
                                    updateServerPort(e.target.value)
                                }} value={server_port}/>
                            </Row>
                            <Row>
                                <Input s={6} label="IP Address we running this on" onChange={(e) => {
                                    updateServerIP(e.target.value)
                                }} value={server_ip}/>
                            </Row>
                        </CollapsibleItem>
                        <CollapsibleItem header='Help' icon='place'>
                            <Collapsible accordion>
                                {
                                    QuestionAndAnswers.map(QandA => {
                                        return (
                                            <CollapsibleItem header={QandA.question}>
                                                <p>
                                                    {QandA.answer}
                                                </p>
                                            </CollapsibleItem>
                                        )
                                    })
                                }
                            </Collapsible>
                        </CollapsibleItem>
                        <CollapsibleItem header='Planned Features' icon='whatshot'>
                            <Row>Youtube-dl is almost finished!!!</Row>
                            <Row>Almost all commands of Soundcloud-dl is supported and integrated</Row>
                            <Row> We're taking application requests</Row>
                            <Row> Working on and finishing batch download support</Row>
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


export default HomeComponent