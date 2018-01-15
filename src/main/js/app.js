import React from 'react';
import ReactDOM from 'react-dom';
import AbmModel from './components/AbmModel';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
    <AbmModel/>
);

ReactDOM.render(<App />, document.getElementById('app'));
