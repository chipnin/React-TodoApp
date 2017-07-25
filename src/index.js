import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock';

import './assets/sass/main.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <Clock/>
            </div>
        );
    }
};

ReactDOM.render(
    <App id='app'/>,
    document.getElementById('root')
);