import React from 'react';
import ReactDOM from 'react-dom';
import Manager from "./components/Manager";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
    <Manager/>
);

ReactDOM.render(<App />, document.getElementById('app'));