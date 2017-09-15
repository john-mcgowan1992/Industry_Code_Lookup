import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import JSONTree from 'react-json-tree';
import axios from 'axios';
import './Dashboard.css';

const style = {
    mindHeight: 600,
    width: 800,
    margin: 'auto'
}

const theme = {
    scheme: 'monokai',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            searchBy: "description",
            searchValue: "",
            openAlert: false,
            json: []
        }
        this._handleSearchCriteriaChange = this._handleSearchCriteriaChange.bind(this)
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this)
        this._handleRequestClose = this._handleRequestClose.bind(this)
        this._searchApi = this._searchApi.bind(this)
    }

    _handleSearchCriteriaChange(event, index, value) {
        this.setState({searchBy: value, searchValue: ""})
    }

    _handleSearchValueChange(event, index, value) {
        this.setState({searchValue: event.target.value})
    }

    _handleRequestClose() {
        this.setState({openAlert: false})
    }

    _searchApi() {
        const { searchBy, searchValue } = this.state;
        const endPoint = `api/industryCodes/${searchBy}/${searchValue}`
        axios.get(endPoint).then(codes => {
            if (!codes.data.length) {
                this.setState({openAlert: true})
            }
            this.setState({json: codes.data})
        })
    }

    render() {
        return (
            <div className="Dashboard">
                <Paper style={style} zDepth={5}>
                    <div className="paper">
                        <div>
                            <SelectField floatingLabelText="Search by"
                                         value={this.state.searchBy}
                                         onChange={this._handleSearchCriteriaChange}
                                         style={{textAlign: 'left'}} >
                                <MenuItem value="ncci" primaryText="NCCI" />
                                <MenuItem value="naics" primaryText="NAICS" />
                                <MenuItem value="ca_wc" primaryText="CA (WCIRB)" />
                                <MenuItem value="description" primaryText="Description" />
                            </SelectField>
                        </div>
                        <div>
                            <TextField value={this.state.searchValue} 
                                    hintText={`Enter ${this.state.searchBy === 'description' ? 'description' : 'code'}`}
                                    onChange={this._handleSearchValueChange} />
                        </div>
                        <div className="searchButton">
                            <RaisedButton onClick={this._searchApi} disabled={!this.state.searchValue} primary={true} label="Search" />
                        </div>
                        <JSONTree data={this.state.json} theme={theme} invertTheme={true} />
                    </div>
                </Paper>
                <Snackbar open={this.state.openAlert} message="No results found. Please try again." 
                          onRequestClose={this._handleRequestClose} autoHideDuration={1500} />
            </div>
        )
    }
}

export default Dashboard;