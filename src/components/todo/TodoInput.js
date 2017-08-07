import React from 'react';

export default class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        this.props.onInputKeyPress(e);
    }

    render() {
        return (
            <input type="text" 
                defaultValue={this.props.value} 
                placeholder={this.props.placeholder} 
                onKeyPress={this.handleKeyPress} />
        );
    }
};