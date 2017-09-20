import React from "react";

class FloatingMenuItem extends React.Component {

    handleClick() {
        this.props.action();
    }

    render() {

        let label;

        if (this.props.label) {
            label = <label>{this.props.label}</label>;
        }

        return <div
            onClick={this.handleClick.bind(this)}
            className="floating-menu-item floating-menu-main">
            {label}
            <div className="floating-menu-icon"><i className="material-icons">{this.props.icon}</i></div>
        </div>;
    }
}

export default FloatingMenuItem