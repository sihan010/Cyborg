import React, { Component } from 'react';
import { View, Clipboard, ToastAndroid } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import nodejs from 'nodejs-mobile-react-native';

class Cypher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passPhrase: '',
            text: '',
            passPhraseError: false,
            textError: false,
            decoded: null
        }
    }

    componentDidMount() {
        nodejs.channel.addListener('decypher', (msg) => {
            if(typeof msg === 'object')
                msg="Error: Passphrase is incorrect or Text is not properly encoded";
            this.setState({
                decoded: msg
            })
        }, this)
    }

    sendToNodeForDecoding() {
        if(this.state.passPhrase.length===0){
            this.setState({
                passPhraseError:true
            })
            return;
        }
        else if(this.state.text.length===0){
            this.setState({
                textError:true
            })
            return;
        }
        let data = {
            pass: this.state.passPhrase,
            hex: this.state.text
        }
        nodejs.channel.post('decypher', data);
    }

    textInputHandler(param, value) {
        switch (param) {
            case 'passPhrase':
                this.setState({ passPhrase: value, passPhraseError:false })
                break;
            case 'text':
                this.setState({ text: value, textError: false })
                break;
        }
    }

    copyToClipboard(){
        Clipboard.setString(this.state.encoded);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={{ margin: 5, padding: 5, justifyContent:'center' }}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={{marginTop:10, fontSize:20}}>Decipher</Text>
                </View>
                <TextInput
                    style={{marginTop:10}}
                    secureTextEntry={true}
                    error={this.state.passPhraseError}
                    value={this.state.passPhrase}
                    label="Passphrase"
                    mode="outlined"
                    onChangeText={(v) => this.textInputHandler('passPhrase', v)}
                />
                <TextInput
                    style={{marginTop:10}}
                    value={this.state.text}
                    error={this.state.textError}
                    label="Encoded Text"
                    mode="outlined"
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(v) => this.textInputHandler('text', v)}
                />
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Button
                        icon="graphic-eq"
                        uppercase={false}
                        onPress={() => this.sendToNodeForDecoding()}
                        mode='contained'
                        style={{ marginTop: 10, width: '50%'}}
                    >Decode
                    </Button>
                </View>
                {
                    this.state.decoded ?
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10, borderBottomWidth:1, borderBottomColor:'#000' }}>Decoded Text</Text>
                            <Text style={{ fontSize: 14, marginTop: 10 }}>{this.state.decoded}</Text>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Button
                                    icon="content-copy"
                                    uppercase={false}
                                    onPress={() => this.copyToClipboard()}
                                    mode='contained'
                                    style={{ marginTop: 10, width: '50%' }}
                                >Copy to Clipboard
                                </Button>
                            </View>                                                     
                        </View>
                        : null
                }
            </View>
        );
    }
}

export default Cypher;