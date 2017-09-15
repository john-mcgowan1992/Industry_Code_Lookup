import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <NavBar />
                    <div className="viewContainer">
                        <Dashboard />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;