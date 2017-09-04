/**
 * Created by Troy on 8/12/2017.
 */
import React, {Component} from 'react'
import {Row, Input, Card, Col, Button} from 'react-materialize'
import 'react-select/dist/react-select.css';


const WgetForm = ({
                      wget, updateWgetLinkPath, updateWgetOutputPath, updateWgetDownloadOption

                  }) =>
    (
        <div className="appContainer">
            <div className="row">
                <Input s={8} label="Url" validate value={wget.url} onChange={(e) => {
                    updateWgetLinkPath(e.target.value)
                }}/>
                <Input s={4} label="Depth Level" validate value={wget.url} onChange={(e) => {
                    updateWgetLinkPath(e.target.value)
                }}/>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Input s={12} label="Output Path(where you want the files saved)" validate value={wget.output_path}
                           onChange={(e) => {
                               updateWgetOutputPath(e.target.value)
                           }}/>
                </div>
            </div>
            <div className="row">
                <Row>
                    <Input name='wget-options' type='checkbox' value='recursive'
                           label='recursive'
                           defaultValue='checked' onClick={(e) => {
                        updateWgetDownloadOption(e.target.value)
                    }}/>
                    <Input name='wget-options' type='checkbox' value='no_parent'
                           label='no_parent'
                           defaultValue='checked' onClick={(e) => {
                        updateWgetDownloadOption(e.target.value)
                    }}/>
                    <Input name='wget-options' type='checkbox' value='no_clobber'
                           label='no_clobber'
                           defaultValue='checked' onClick={(e) => {
                        updateWgetDownloadOption(e.target.value)
                    }}/>
                    <Input name='wget-options' type='checkbox' value='robots'
                           label='robots'
                           defaultValue='checked' onClick={(e) => {
                        updateWgetDownloadOption(e.target.value)
                    }}/>
                </Row>
            </div>
            <Row>
                <Input name='wget-options' type='checkbox' value='mirror'
                       label='mirror'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
                <Input name='wget-options' type='checkbox' value='accept'
                       label='accept'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
                <Input name='wget-options' type='checkbox' value='reject'
                       label='reject'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
                <Input name='wget-options' type='checkbox' value='check_certificate'
                       label='check_certificate'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
            </Row>
            <div className="row">

            </div>
        </div>
    );


export default WgetForm
