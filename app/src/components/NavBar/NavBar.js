import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class NavBar extends Component {
    render() {
        return (
            <AppBar title="Huckleyberry Industry Code Engine" showMenuIconButton={false} />
        )
    }
}

export default NavBar;