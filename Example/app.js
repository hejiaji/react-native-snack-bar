import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SnackBar from './components/snackBarComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSnackBarClick = this.handleSnackBarClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      isSnackBarVisible: true,
    };
  }

  handleSnackBarClick() {
    console.log('Snack Bar clicked');
  }

  handleButtonClick() {
    this.setState({
      isSnackBarVisible: !this.state.isSnackBarVisible,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleButtonClick}
        >
          <Text>Click</Text>
        </TouchableOpacity>
        <SnackBar
          isVisible={this.state.isSnackBarVisible}
          messageText="Hello There!"
          onActionClick={this.handleSnackBarClick}
          actionText="let's go"
        />
      </View>
    );
  }
}

export default App;
