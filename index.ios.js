/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,  
  View  
} = React;
var t = require('tcomb-form-native');

var Form = t.form.Form;

var Emergency = t.struct({
  email: t.Str,
  detail: t.Str
});

var options = {
  fields: {
    detail: {
      multiline: true
    }
  }
};

var emergencyJS = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Emergency JS!
        </Text>
        <Text style={styles.instructions}>
          Let us know your JavaScript emergency and someone from the team will be in touch shortly!
        </Text>
        <Form
          ref="form"
          type={Emergency}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  },
  onPress: function() {
    var form = this.refs.form.getValue();
    if (form) {
      fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "channel": "#emergency",
          "username": form.email,
          "text": form.detail,
          "icon_emoji": ":oncoming_police_car:"
        })
      })
      alert('Request Sent! We\'ll be in touch shortly...');
    } else {
      alert('Please enter your email address and your emergency detail.');
    }
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#F6DE1E'
  },
  instructions: {
    margin: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FC321C',
    borderColor: '#FC321C',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }  
});

AppRegistry.registerComponent('emergencyJS', () => emergencyJS);
