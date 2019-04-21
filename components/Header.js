import React, { Component } from 'react';
import { Appbar, Avatar } from 'react-native-paper';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Appbar.Header>              
                <Avatar.Icon size={54} icon="directions-run" color="#884EA0" />                
                <Appbar.Content
                    title="Cyborg"
                    subtitle="Cipher and Decipher"
                    titleStyle={{fontSize:16}}
                    subtitleStyle={{fontSize:14}}
                />
                <Appbar.Action icon="enhanced-encryption" color="#117864" onPress={()=>this.props.pageSelector(0)} />
                <Appbar.Action icon="no-encryption" color="#B03A2E" onPress={()=>this.props.pageSelector(1)} />
            </Appbar.Header>
        );
    }
}

export default Header;