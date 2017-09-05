import React from "react";
import {Button, Input, Row} from "react-materialize";
import "react-select/dist/react-select.css";
import {WgetSubmission} from "./WgetFormValidation";
import RejectValueForm from "./RejectValueForm";
import AcceptValueForm from "./AcceptValueForm";


const WgetForm = ({
                      wget, updateWgetLinkPath, updateWgetOutputPath, updateWgetDownloadOption, updateWgetDepthLevel,
                      updateWgetRejectValues, updateWgetAcceptValues
                  }) =>
    (
        <div className="appContainer">
            <Row>
                <Input s={8} label="Url" validate value={wget.url} onChange={(e) => {
                    updateWgetLinkPath(e.target.value)
                }}/>
                <Input s={4} label="Depth Level" validate defaultValue={0} value={wget.depth_level} onChange={(e) => {
                    updateWgetDepthLevel(e.target.value)
                }}/>
            </Row>
            <Row>

                <Input s={12} label="Output Path(where you want the files saved)" validate value={wget.output_path}
                       onChange={(e) => {
                           updateWgetOutputPath(e.target.value)
                       }}/>
            </Row>

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

            <Row>
                <Input name='wget-options' type='checkbox' value='mirror'
                       label='mirror'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
                <Input name='wget-options' type='checkbox' value='check_certificate'
                       label='check_certificate'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>
                <Input name='wget-options' type='checkbox' value='accept'
                       label='accept'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>{wget.download_options.accept ? <AcceptValueForm onChangeValue={(value) => {
                updateWgetAcceptValues(value)
            }}
                                                                     label="Accept File Formats (exclude the ' . ' from file-extension and hit enter to add it after typing it)"/> : null}
                <Input name='wget-options' type='checkbox' value='reject'
                       label='reject'
                       defaultValue='checked' onClick={(e) => {
                    updateWgetDownloadOption(e.target.value)
                }}/>{wget.download_options.reject ? <RejectValueForm onChangeValue={(value) => {
                updateWgetRejectValues(value)
            }}
                                                                     label="Reject File Formats (exclude the ' . ' from file-extension and hit enter to add it after typing it)"/> : null}

            </Row>
            <Row>
                <Button waves='light' onClick={WgetSubmission}>Submit</Button>
            </Row>
        </div>
    );


export default WgetForm
