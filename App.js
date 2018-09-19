import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { createNavigator, createNavigationContainer } from 'react-navigation';
import { BottomTabBar, createTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';

class AnimatedTabNavigationView extends React.Component {
  constructor(props) {
    super(props);
    const initialIndex = props.navigation.state.index;

    this.state = {
      selectedIndexAnimated: new Animated.Value(initialIndex),
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.navigation.state.index !== this.props.navigation.state.index
    ) {
      Animated.timing(this.state.selectedIndexAnimated, {
        toValue: this.props.navigation.state.index,
        duration: 250,
      }).start();
    }
  }

  _renderTabs = () => {
    return this.props.navigation.state.routes.map(this._renderTab);
  };

  _renderTab = (route, index) => {
    // You can animate anything here!
    const { selectedIndexAnimated } = this.state;

    let opacity = selectedIndexAnimated.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: '#fff', opacity },
        ]}
        key={route.key}>
        {this.props.renderScene({ route })}
      </Animated.View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>{this._renderTabs()}</View>
        <TabBar {...this.props} />
      </View>
    );
  }
}

class TabBar extends React.Component {
  // This is copy/pasted directly from:
  // https://github.com/react-navigation/react-navigation-tabs/blob/master/src/navigators/createBottomTabNavigator.js
  render() {
    const {
      tabBarComponent: TabBarComponent = BottomTabBar,
      tabBarOptions,
      navigation,
      screenProps,
      getLabelText,
      getAccessibilityLabel,
      getButtonComponent,
      getTestID,
      renderIcon,
      onTabPress,
    } = this.props;

    const { descriptors } = this.props;
    const { state } = this.props.navigation;
    const route = state.routes[state.index];
    const descriptor = descriptors[route.key];
    const options = descriptor.options;

    if (options.tabBarVisible === false) {
      return null;
    }

    return (
      <TabBarComponent
        {...tabBarOptions}
        jumpTo={this._jumpTo}
        navigation={navigation}
        screenProps={screenProps}
        onTabPress={onTabPress}
        getLabelText={getLabelText}
        getButtonComponent={getButtonComponent}
        getAccessibilityLabel={getAccessibilityLabel}
        getTestID={getTestID}
        renderIcon={renderIcon}
      />
    );
  }
}

const createAnimatedTabNavigator = createTabNavigator(
  AnimatedTabNavigationView
);

class Home extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, horizontal }) => (
      <FontAwesome
        color={tintColor}
        size={horizontal ? 20 : 30}
        name="check-circle"
      />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

class Away extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, horizontal }) => (
      <FontAwesome
        color={tintColor}
        size={horizontal ? 20 : 30}
        name="stop-circle"
      />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>💘</Text>
      </View>
    );
  }
}

class Other extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor, horizontal }) => (
      <FontAwesome
        color={tintColor}
        size={horizontal ? 20 : 30}
        name="question-circle"
      />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>🙏</Text>
      </View>
    );
  }
}

export default createAnimatedTabNavigator({
  Home,
  Away,
  Other,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
