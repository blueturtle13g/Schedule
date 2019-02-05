import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

export default class App extends Component {

    render(){
        return (
            <Provider store={createStore(reducers)}>
                <View style={styles.container}>
                    <AddTask/>
                    <Tasks/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});