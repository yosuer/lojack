import React from 'react';
import ReactDOM from 'react-dom';
import ModelAbm from './components/ModelAbm';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
    <ModelAbm model="owners"/>
);

ReactDOM.render(<App />, document.getElementById('app'));