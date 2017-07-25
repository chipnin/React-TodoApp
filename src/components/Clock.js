import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    componentDidMount() {
        this.timeId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    render() {
        return (
            <div>
                <h1>Clock</h1>
                <p>Current time is { this.state.date.toLocaleTimeString() }</p>
            </div>
        );
    }
};