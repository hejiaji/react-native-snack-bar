import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import Touchable from './touchable';
import { noop } from './../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#484848',
  },
  messageText: {
    fontSize: 14,
    flex: 1,
    color: '#FFFFFF',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'orange',
  },
});

const easingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};

const durationValues = {
  entry: 225,
  exit: 195,
};
class SnackbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(this.props.isVisible ? 1 : 0),
      containerHeight: 0,
    };
  }

  render() {
    const shouldShowActionArea = this.props.onActionClick && this.props.actionText;
    const { containerHeight } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          this.props.containerStyle,
          {
            bottom: this.state.translateValue.interpolate(
              { inputRange: [0, 1], outputRange: [-containerHeight, 0] }),
          },
        ]}
        onLayout={(event) => {
          this.setState({ containerHeight: event.nativeEvent.layout.height });
        }}
      >
        <Text style={[styles.messageText, this.props.messageTextStyle]}>
          {this.props.messageText}
        </Text>
        {
          shouldShowActionArea &&
          <Touchable onPress={this.props.onActionClick} >
            <Text style={[styles.actionText, this.props.actionTextStyle]}>
              {this.props.actionText.toUpperCase()}
            </Text>
          </Touchable>
        }
      </Animated.View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.isVisible) && (!this.props.isVisible)) {
      Animated.timing(
        this.state.translateValue,
        {
          duration: durationValues.entry,
          toValue: 1,
          easing: easingValues.entry,
        },
      ).start();
    } else if ((!nextProps.isVisible) && (this.props.isVisible)) {
      Animated.timing(
        this.state.translateValue,
        {
          duration: durationValues.exit,
          toValue: 0,
          easing: easingValues.exit,
        },
      ).start();
    }
  }
}


SnackbarComponent.defaultProps = {
  onActionClick: noop,
  isVisible: false,
  messageText: '',
  actionText: '',
};

SnackbarComponent.propTypes = {
  containerStyle: PropTypes.number,
  onActionClick: PropTypes.func,
  isVisible: PropTypes.bool,
  messageText: PropTypes.string,
  actionText: PropTypes.string,
  actionTextStyle: PropTypes.number,
  messageTextStyle: PropTypes.number,
};

export default SnackbarComponent;
