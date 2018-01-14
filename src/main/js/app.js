import React from 'react';
import ReactDOM from 'react-dom';
import AbmModel from './components/AbmModel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
        <AbmModel/>
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
