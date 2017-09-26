/**
 * The settings class for Youtube-dl sends request on save
 */
import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";
import YoutubeDLPicker from "./YoutubeDLPicker";
import Select from "react-select";
import {saveYoutubeDLSettings} from "../../../../../utility/util";

/**
 * Settings Module for Youtube-dl will be refactored due to its gross naturee
 */
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
                    output_title_options: [{value: '%(id)s', label: 'id'}, {value: '%(title)s', label: 'title'}, {
                        value: '%(upload_date)s', label: 'upload_date'
                    }, {value: '%(url)s', label: 'url'}, {
                        value: '%(playlist_title)s',
                        label: 'playlist_title'
                    }, {value: '%(extractor)s', label: 'extractor'}, {value: 'resolution', label: 'resolution'}, {
                        value: 'fps',
                        label: 'fps'
                    }, {
                        value: '%(epoch)s',
                        label: 'epoch'
                    }, {value: '%(track)s', label: 'track'}, {
                        value: '%(track_number)s', label: 'track_number'
                    }, {value: '%(artist)s', label: 'artist'},
                        {value: '%(genre)s', label: 'genre'}, {
                            value: '%(album)s',
                            label: 'album'
                        }, {value: '%(series)s', label: 'series'}, {value: '%(season)s', label: 'season'}, {
                            value: '%(season_number)s',
                            label: 'season_number'
                        },
                        {value: '%(season_id)s', label: 'season_id'}, {
                            value: '%(episode)s',
                            label: 'episode'
                        }, {value: '%(episode_number)s', label: 'episode_number'}]
                },
                multi: true,
                multiValue: [],
                value: undefined,
                subtitles: undefined,
                subtitle_languages: undefined,
                write_auto_sub: false,
                ignore_errors: true,
                embed_thumbnail: true,
                output_title: [],
                output_example: '',

            };

        this.state.logChange = (val) => {
            console.log("Selected: " + JSON.stringify(val));
        };

        this.state.handleOnChange = (value, item) => {
            const {multi} = this.state;
            if (multi) {
                this.setState({[item]: value});
            } else {
                this.setState({value});
            }
        }
    }

    handleExampleChange = () => {
        let ex = "";
        if (this.state.output_title.length > 0) {
            for (let i = 0; i < this.state.output_title.length; i++) {
                ex += "" + this.state.output_title[i].value + ""

            }
            ex += +".%(ext)s";
            this.state.output_example = ex;
            return ex;
        }
        else {
            this.state.output_example = '';

        }

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
                            <Select.Creatable
                                name="form-field-name"
                                value={this.state.multi ? this.state.output_title : this.state.value}
                                multi={true}
                                options={this.state.options.output_title_options}
                                onChange={(val) => {
                                    this.state.handleOnChange(val, "output_title");
                                    this.handleExampleChange();
                                }}
                            />
                        </Col>
                        <Col s={6} className={"youtube-dl-seeting-input"}>
                            <Input s={12} m={12} type='select' label="Automatically Write Subs"
                                   value={this.state.write_auto_sub} onChange={(e) => {
                                this.state.handleOnChange(e.target.value, "write_auto_sub")
                            }}>
                                <option value={'true'}>Yes</option>
                                <option value={'false'}>No</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Input s={12} m={12} type='select' label="Embed Thumbnail"
                               value={this.state.write_auto_sub} onChange={(e) => {
                            this.state.handleOnChange(e.target.value, "embed_thumbnail")
                        }}>
                            <option value={'true'}>Yes</option>
                            <option value={'false'}>No</option>
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
                        <Col s={3}> <Button large className='indigo darken-1' waves='yellow' onClick={(e) => {
                            saveYoutubeDLSettings(this.state)
                        }}>Save</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default YoutubeDLSettings