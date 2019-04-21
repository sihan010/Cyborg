import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import Header from './components/Header'
import Cypher from './components/Cypher'
import Decypher from './components/Decypher'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  componentDidMount() {
    nodejs.start('main.js');
    nodejs.channel.addListener('message', (msg) => { console.log(msg) }, this);
  }

  pageSelector(param) {
    console.log("page: ", param);
    this.setState({
      page: param
    })
  }

  render() {
    StatusBar.setBackgroundColor('#1C2833', true);
    return (
      <View style={{ flex: 1, backgroundColor: '#FAE5D3' }}>
        <View style={{ flex: 1 }}>
          <Header pageSelector={(v) => this.pageSelector(v)} />
        </View>
        <View style={{ flex: 10 }}>
          {
            this.state.page ? <Decypher /> : <Cypher/>
          }
        </View>
      </View>
    );
  }
}
