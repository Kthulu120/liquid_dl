import React from 'react';
import createClass from 'create-react-class';
import Select from 'react-select';

const YoutubeDLPicker = createClass({
    displayName: 'CreatableDemo',
    getInitialState () {
        return {
            multi: true,
            multiValue: [],
            options: this.props.options,
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
        this.props.onChangeValue(value)
    },
    render () {
        const {multi, multiValue, options, value} = this.state;
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
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

export default YoutubeDLPicker