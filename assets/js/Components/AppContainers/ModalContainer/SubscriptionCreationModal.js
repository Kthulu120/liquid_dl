/**
 * The inside of our Subscription Creation Modal that's called in the DownloadManagerForm
 */
import React from "react";
import {Button, Col, Collection, Icon, Input, Row} from "react-materialize";
import {submitNewSubscription} from "../../../utility/util";
import {SubscriptionProvders} from '../../../utility/QuestionsAndAnswers'
import Select from "react-select";

/**
 * @class SubscriptionCreationModal
 * @classdesc Manages Creation Modal state and resets it upon creating a new subscription
 */
class SubscriptionCreationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();

    }

    handleOnChange = (value, item) => {
        const {multi} = this.state;
        if (multi) {
            console.log(value);
            this.setState({[item]: value});
        } else {
            this.setState({value});
        }

    };

    getInitialState = () => {
        return {
            url: '',
            folder_path: '',
            subscription_name: '',
            output_template: '',
            provider: '',
            options: {
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
            output_title: [],
            example: '',

        }
    };



    handleExampleChange = () => {
        let ex = "";
        if (this.state.output_title.length > 0) {
            for (let i = 0; i < this.state.output_title.length; i++) {
                ex += "" + this.state.output_title[i].value + ""
            }
            this.state.example = ex;
            return ex;
        }
        else {
            this.state.example = '';

        }

    };

    render() {
        return (
            <div>
                <Row>
                    <Col s={12}>
                        <Input label="URL" className={"modal-input"} onChange={(e) => {
                            this.handleOnChange(e.target.value, "url")
                        }}/>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Folder Path (use forward slashes...trust us)" onChange={(e) => {
                            this.handleOnChange(e.target.value, "folder_path")
                        }}/>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Provider" type='select' onChange={(e) => {
                            this.handleOnChange(e.target.value, "provider")
                        }}>{
                            SubscriptionProvders.map(provider => {
                                return (
                                    <option value={provider.value} key={provider.value}>{provider.label}</option>
                                )
                            })
                        }</Input>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Input className={"modal-input"}
                               label="Subscription Name" onChange={(e) => {
                            this.handleOnChange(e.target.value, "subscription_name")
                        }}/>
                    </Col>
                </Row>
                <Row>
                    <Col s={7}>
                        <Select.Creatable
                            name="form-field-name"
                            value={this.state.multi ? this.state.output_title : this.state.value}
                            multi={true}
                            options={this.state.options.output_title_options}
                            onChange={(val) => {
                                this.handleOnChange(val, "output_title")
                            }}
                        />
                    </Col>
                    <Col s={5}>
                        <p>{
                            this.handleExampleChange()
                        }</p>
                    </Col>

                </Row>
                <Row>
                    <Button onClick={(e) => {
                        submitNewSubscription(this.state);
                        this.state = this.getInitialState();
                    }}>Save Subscription</Button>
                </Row>


            </div>
        )
    }
}

export default SubscriptionCreationModal