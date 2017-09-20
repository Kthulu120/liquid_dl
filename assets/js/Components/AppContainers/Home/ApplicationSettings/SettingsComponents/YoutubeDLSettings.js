/**
 * The settings class for Youtube-dl sends request on save
 */
import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";
import YoutubeDLPicker from "./YoutubeDLPicker";
import Select from "react-select";

class YoutubeDLSettings extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state =
            {
                /**
                 * Initial Settings for the state with settings_form being the form_name when we submit
                 */
                setting_form: 'youtube-dl',
                'ps': '',
                'admin': '',
                options: {
                    subtitle_languages: [{value: 'eng', label: 'eng'}, {value: 'ps', label: 'ps'}, {
                        value: 'fr',
                        label: 'fr'
                    }, {value: 'sp', label: 'sp'}],
                    subtitle_formats: [{value: 'ass', label: 'ass'}, {value: 'srt', label: 'srt'}],
                    output_title_options: [{value: 'id', label: 'id'}, {value: 'title', label: 'title'}, {
                        value: 'ext',
                        label: 'ext'
                    }, {value: 'url', label: 'url'}]
                },
                multi: true,
                multiValue: [],
                value: undefined,
                subtitles: undefined,
                subtitle_languages: undefined,
                write_auto_sub: false,
                ignore_errors: true

            };

        this.state.logChange = (val) => {
            console.log("Selected: " + JSON.stringify(val));
        };

        this.state.handleOnChange = (value, item) => {
            const {multi} = this.state;
            if (multi) {
                console.log(item);
                this.setState({[item]: value});
            } else {
                this.setState({value});
            }
        }
    }

    handleChange = (event) => {

    };

    render() {
        return (
            <div>
                <div className="card">
                    <Row>
                        <Col s={6}>
                            <label>Subtitle Formats</label>
                            <Select
                                name="form-field-name"
                                value={this.state.multi ? this.state.subtitles : this.state.value}
                                multi={true}
                                options={this.state.options.subtitle_formats}
                                onChange={(val) => {
                                    this.state.handleOnChange(val, "subtitles")
                                }}
                            />
                        </Col>
                        <Col s={6}>
                            <label>Subtitle Language Options</label>
                            <Select
                                name="form-field-name"
                                value={this.state.multi ? this.state.subtitle_languages : this.state.value}
                                multi={true}
                                options={this.state.options.subtitle_languages}
                                onChange={(val) => {
                                    this.state.handleOnChange(val, "subtitle_languages")
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <label>Output Template</label>
                            <Select
                                name="form-field-name"
                                value={this.state.multi ? this.state.subtitle_languages : this.state.value}
                                multi={true}
                                options={this.state.options.subtitle_languages}
                                onChange={(val) => {
                                    this.state.handleOnChange(val, "subtitle_languages")
                                }}
                            />
                        </Col>
                        <Col s={6} className={"youtube-dl-seeting-input"}>
                            <Input s={12} m={12} type='select' label="Automatically Write Subs"
                                   value={this.state.write_auto_sub} onChange={(e) => {
                                this.state.handleOnChange(e.target.value, "write_auto_sub")
                            }}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Input s={12} m={12} type='select' label="Embed Thumbnail"
                               value={this.state.write_auto_sub} onChange={(e) => {
                            this.state.handleOnChange(e.target.value, "write_auto_sub")
                        }}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Input>
                    </Row>
                    <Row>
                        <Input s={12} m={12} type='select' label="Ignore_errors"
                               value={this.state.write_auto_sub} onChange={(e) => {
                            this.state.handleOnChange(e.target.value, "ignore_errors")
                        }}>
                            <option value={'true'}>Yes</option>
                            <option value={'false'}>No</option>
                        </Input>
                    </Row>
                    <Row>
                        <Col s={3}> <Button large className='indigo darken-1' waves='light'>Save</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default YoutubeDLSettings