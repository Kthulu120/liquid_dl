import React from "react";
import createClass from "create-react-class";
import Select from "react-select";
import {makeValueArray} from "./WgetFormValidation";

const RejectValueForm = createClass({
    displayName: 'RejectValueForm',
    getInitialState () {
        return {
            multi: true,
            multiValue: [],
            options: [],
            value: undefined
        };
    },
    handleOnChange (value) {
        const {multi} = this.state;
        if (multi) {
            this.setState({multiValue: value});
        } else {
            this.setState({value});
        }
        this.props.onChangeValue(makeValueArray(value))
    },
    render () {
        const {multi, multiValue, options, value} = this.state;
        return (
            <div className="section">
                <p className="section-heading">{this.props.label}</p>
                <Select.Creatable
                    multi={multi}
                    options={options}
                    onChange={this.handleOnChange}
                    value={multi ? multiValue : value}
                />

            </div>
        );
    }
});

export default RejectValueForm